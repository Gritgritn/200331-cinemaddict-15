import { UserAction, UpdateType, CommentsTitle } from '../const.js';
import { getCurrentDate, isEsc, isEnter } from '../utils/common.js';
import { render, rerender, remove, RenderPosition } from '../utils/render.js';

import FilmDetailsView from '../view/film-details/film-details.js';
import FilmDetailsBottomView from '../view/film-details/film-details-bottom.js';
import CommentsContainerView from '../view/film-details/comments-container.js';
import CommentsTitleView from '../view/film-details/comments-title.js';
import CommentsListView from '../view/film-details/comments-list.js';
import CommentView from '../view/film-details/comment.js';
import NewCommentView from '../view/film-details/new-comment.js';

class FilmDetailsPresenter {
  constructor(filmDetailsContainer, filmsModel, changeFilm, hideFilmDetails, api) {
    this._filmDetailsContainer = filmDetailsContainer;
    this._filmsModel = filmsModel;
    this._changeFilm = changeFilm;
    this._hideFilmDetails = hideFilmDetails;
    this._api = api;
    this._filmComments = [];
    this._prevScrollTop = 0;
    this._commentView = new Map();

    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleDocumentKeydown = this._handleDocumentKeydown.bind(this);

    this._handleAddToWatchButtonClick = this._handleAddToWatchButtonClick.bind(this);
    this._handleAddWatchedButtonClick = this._handleAddWatchedButtonClick.bind(this);
    this._handleAddFavoriteButtonClick = this._handleAddFavoriteButtonClick.bind(this);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(film, { loadComments = true } = {}) {
    this._film = film;
    this._isLoading = loadComments;
    this._commentsTitleView = null;
    this._commentsListView = null;
    this._commentView = new Map();
    this._renderFilmDetails();
  }

  // _renderComment(comment) {
  //   render(this._commentsContainerView, new CommentView(comment), RenderPosition.BEFOREEND);
  // }

  _renderCommentsContainer() {
    this._commentsContainerView = new CommentsContainerView();
    render(this._filmDetailsBottomView, this._commentsContainerView, RenderPosition.BEFOREEND);
  }

  _getCommentsTitle() {
    if (this._isLoading) {
      return CommentsTitle.LOADING;
    }
    if (this._isError) {
      return CommentsTitle.ERROR;
    }
    return this._filmComments.length;
  }

  _renderComments() {
    const prevCommentsTitleView = this._commentsTitleView;
    const prevCommentsListView = this._commentsListView;
    this._commentsTitleView =  new CommentsTitleView(this._getCommentsTitle());
    this._commentsListView = new CommentsListView();

    rerender(this._commentsTitleView, prevCommentsTitleView, this._commentsContainerView);
    rerender(this._commentsListView, prevCommentsListView, this._commentsContainerView);

    if (this._isLoading || this._isError) {
      return;
    }

    this._filmComments.forEach((comment) => {
      const commentView = new CommentView(comment);
      this._commentView.set(comment.id, commentView);
      commentView.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
      render(this._commentsListView, commentView, RenderPosition.BEFOREEND);
    });
  }

  get filmId() {
    if (this._film) {
      return this._film.id;
    }

    throw new Error('Film Presenter has not been initialized');
  }

  _handleCloseButtonClick() {
    this._hideFilmDetails();
  }

  _handleDocumentKeydown(evt) {
    if ((isEnter(evt) && evt.ctrlKey)) {
      this._handleFormSubmit();
      return;
    }

    if (isEsc(evt)) {
      evt.preventDefault();
      this._hideFilmDetails();
    }
  }

  _handleAddToWatchButtonClick() {
    const copyFilm = {...this._film};
    const filmUserDetails = copyFilm.userDetails;
    filmUserDetails.watchlist = !this._film.userDetails.watchlist;
    this._changeFilm(UserAction.UPDATE_FILM, UpdateType.MINOR, copyFilm);
  }

  _handleAddWatchedButtonClick() {
    const copyFilm = {...this._film};
    const filmUserDetails = copyFilm.userDetails;
    filmUserDetails.alreadyWatched = !this._film.userDetails.alreadyWatched;
    filmUserDetails.watchingDate = !this._film.userDetails.alreadyWatched ? '' : getCurrentDate();
    this._changeFilm(UserAction.UPDATE_FILM, UpdateType.MINOR, copyFilm);
  }

  _handleAddFavoriteButtonClick() {
    const copyFilm = {...this._film};
    const filmUserDetails = copyFilm.userDetails;
    filmUserDetails.favorite = !this._film.userDetails.favorite;
    this._changeFilm(UserAction.UPDATE_FILM, UpdateType.MINOR, copyFilm);
  }

  async _handleDeleteButtonClick(commentId) {
    try {
      this._commentView.get(commentId).setDeletingStatus();
      await this._api.deleteComment(commentId);

      const updatedFilm = {
        ...this._film,
        comments: this._film.comments.filter((id) => id !== commentId),
      };
      this._filmComments = this._filmComments.filter(({ id }) => id !== commentId);
      this._changeFilm('delete comment', UpdateType.PATCH, updatedFilm);

    } catch (error) {
      this._commentView.get(commentId).resetDeletingStatus();
    }
  }

  async _handleFormSubmit() {
    const newComment = this._newCommentView.getData();

    try {
      this._newCommentView.disable();
      this._newCommentView.clearErrorState();
      const { updatedFilm, updatedComments } =  await this._api.addComment(this._film, newComment);

      this._filmComments = updatedComments;
      this._changeFilm(null, UpdateType.PATCH, updatedFilm);
      this._newCommentView.reset();
    } catch (error) {
      this._newCommentView.setErrorState();
    }
    this._newCommentView.enable();
  }

  _renderFilmInfo() {
    const prevFilmDetailsView = this._filmDetailsView;

    this._filmDetailsView = new FilmDetailsView(this._film);

    this._filmDetailsView.setClosePopupButtonHandler(this._handleCloseButtonClick);

    this._filmDetailsView.setAddToWatchlistPopupButtonClick(this._handleAddToWatchButtonClick);
    this._filmDetailsView.setMarkAsWatchedPopupButtonClick(this._handleAddWatchedButtonClick);
    this._filmDetailsView.setAddFavoriteButtonClickHandler(this._handleAddFavoriteButtonClick);

    rerender(this._filmDetailsView, prevFilmDetailsView, this._filmDetailsContainer);
    if (!prevFilmDetailsView) {
      document.addEventListener('keydown', this._handleDocumentKeydown);
    }
  }

  _renderNewComment() {
    this._newCommentView = this._newCommentView || new NewCommentView();
    render(this._commentsContainerView, this._newCommentView, RenderPosition.BEFOREEND);
  }

  _renderFilmsBottom() {
    this._filmDetailsBottomView = new FilmDetailsBottomView();

    this._renderCommentsContainer();
    this._renderComments();
    this._renderNewComment();

    render(this._filmDetailsView, this._filmDetailsBottomView, RenderPosition.BEFOREEND);
  }

  async _renderFilmDetails() {
    this._isLoading = true;
    this._isError = false;
    this._prevScrollTop = this._filmDetailsView ? this._filmDetailsView.scrollTop : 0;

    this._renderFilmInfo();
    this._renderFilmsBottom();

    this._filmDetailsView.scrollTop = this._prevScrollTop;

    if (!this._isLoading) {
      return;
    }
    try {
      this._isError = false;
      this._filmComments = await this._api.getComments(this._film);
    } catch (error) {
      this._isError = true;
    } finally {
      this._isLoading = false;
      // this._prevScrollTop = this._filmDetailsView.scrollTop;
      this._renderComments();
      this._filmDetailsView.scrollTop = this._prevScrollTop;
    }
  }

  _handleModelEvent(updateType, updatedFilm) {
    if (updateType === UpdateType.MAJOR) {
      return;
    }
    this.init(updatedFilm, { loadComments: false });
  }

  destroy() {
    remove(this._filmDetailsView);
    this._filmsModel.removeObserver(this._handleModelEvent);
    document.removeEventListener('keydown', this._handleDocumentKeydown);
  }
}

export default FilmDetailsPresenter;
