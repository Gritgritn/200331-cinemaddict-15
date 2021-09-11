import { UserAction, UpdateType } from '../const.js';
import { getCurrentDate, isEsc, isEnter } from '../utils/common.js';
import { render, replace, remove, RenderPosition } from '../utils/render.js';

import FilmDetailsView from '../view/film-details/film-details.js';
import FilmDetailsBottomView from '../view/film-details/film-details-bottom.js';
import CommentsContainerView from '../view/film-details/comments-container.js';
import CommentsTitleView from '../view/film-details/comments-title.js';
import CommentsListView from '../view/film-details/comments-list.js';
import CommentView from '../view/film-details/comment.js';
import NewCommentView from '../view/film-details/new-comment.js';

class FilmDetailsPresenter {
  constructor(filmDetailsContainer, filmsModel, changeFilm, hideFilmDetails) {
    this._filmDetailsContainer = filmDetailsContainer;
    this._filmsModel = filmsModel;
    this._changeFilm = changeFilm;
    this._hideFilmDetails = hideFilmDetails;

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

  init(film) {
    this._film = film;
    this._renderFilmDetails();
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
    filmUserDetails.watchingDate = !this._film.userDetails.alreadyWatched ? "" : getCurrentDate();
    this._changeFilm(UserAction.UPDATE_FILM, UpdateType.MINOR, copyFilm);
  }

  _handleAddFavoriteButtonClick() {
    const copyFilm = {...this._film};
    const filmUserDetails = copyFilm.userDetails;
    filmUserDetails.favorite = !this._film.userDetails.favorite;
    this._changeFilm(UserAction.UPDATE_FILM, UpdateType.MINOR, copyFilm);
  }

  _handleDeleteButtonClick(id) {
    const payload = {
      commentId: id,
      film: this._film,
    };
    this._changeFilm(UserAction.DELETE_COMMENT, UpdateType.PATCH, payload);
  }

  _handleFormSubmit() {
    const newComment = this._newCommentView.getData();

    if (!newComment.text || !newComment.emotion) {
      return;
    }

    const payload = {
      newComment,
      film: this._film,
    };

    this._changeFilm(UserAction.CREATE_COMMENT, UpdateType.PATCH, payload);
    this._newCommentView.reset();
  }

  _renderFilmInfo() {
    this._filmDetailsView = new FilmDetailsView(this._film);
    this._filmDetailsBottomView = new FilmDetailsBottomView();

    this._filmDetailsView.setClosePopupButtonHandler(this._handleCloseButtonClick);

    this._filmDetailsView.setAddToWatchlistPopupButtonClick(this._handleAddToWatchButtonClick);
    this._filmDetailsView.setMarkAsWatchedPopupButtonClick(this._handleAddWatchedButtonClick);
    this._filmDetailsView.setAddFavoriteButtonClickHandler(this._handleAddFavoriteButtonClick);

    render(this._filmDetailsView, this._filmDetailsBottomView, RenderPosition.BEFOREEND);
  }

  _renderComments() {
    const filmComments = this._filmsModel.getFilmComments(this.filmId);
    this._commentsContainerView = new CommentsContainerView();
    render(this._filmDetailsBottomView, this._commentsContainerView, RenderPosition.BEFOREEND);

    this._commentsTitleView =  new CommentsTitleView(filmComments.length);
    this._commentsListView = new CommentsListView();

    render(this._commentsContainerView, this._commentsTitleView, RenderPosition.BEFOREEND);
    render(this._commentsContainerView, this._commentsListView, RenderPosition.BEFOREEND);

    filmComments.forEach((comment) => {
      const commentsView = new CommentView(comment);
      commentsView.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
      render(this._commentsListView, commentsView, RenderPosition.BEFOREEND);
    });
  }

  _renderNewComment() {
    if (!this._newCommentView) {
      this._newCommentView = new NewCommentView();
    }

    render(this._commentsListView, this._newCommentView, RenderPosition.BEFOREEND);
  }

  _renderFilmDetails() {
    const prevFilmDetailsView = this._filmDetailsView;
    const scrollTop = prevFilmDetailsView ? this._filmDetailsView.scrollTop : null;

    this._renderFilmInfo();
    this._renderComments();
    this._renderNewComment();

    if (prevFilmDetailsView) {
      document.removeEventListener('keydown', this._handleDocumentKeydown);
      replace(this._filmDetailsView, prevFilmDetailsView);
      this._filmDetailsView.scrollTop = scrollTop;
    } else {
      render(this._filmDetailsContainer, this._filmDetailsView, RenderPosition.BEFOREEND);
    }

    document.addEventListener('keydown', this._handleDocumentKeydown);
  }

  _handleModelEvent(updateType, updatedFilm) {
    this.init(updatedFilm);
  }

  destroy() {
    remove(this._filmDetailsView);
    this._filmsModel.removeObserver(this._handleModelEvent);
    document.removeEventListener('keydown', this._handleDocumentKeydown);
  }
}

export default FilmDetailsPresenter;
