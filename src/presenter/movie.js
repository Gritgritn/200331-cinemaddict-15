import FilmCardView from '../view/card.js';
import PopupTemplateView from '../view/popup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {KeyboardKey, UserAction, UpdateType, EventType} from '../const.js';
import CommentItem from '../view/popup-comment.js';
import PopupNewCommentForm from '../view/popup-new-comment.js';
import PopupTemplatePresenter from './film-details.js';

class Film {
  constructor(filmCardContainer, changeData, showFilmDetails) {
    this._showFilmDetails = showFilmDetails;
    this._filmCardContainer = filmCardContainer;
    this._changeData = changeData;
    this._filmCardComponent = null;
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAsWatchedClick = this._handleAsWatchedClick.bind(this);
    this._handleOpenFilmDetailsClick = this._handleOpenFilmDetailsClick.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._bodyContainer = document.querySelector('body');
    this._filmCardComponent.setPosterClickHandler(this._handleOpenFilmDetailsClick);
    this._filmCardComponent.setFilmNameClickHandler(this._handleOpenFilmDetailsClick);
    this._filmCardComponent.setAllCommentsClickHandler(this._handleOpenFilmDetailsClick);

    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setAsWatchedClickHandler(this._handleAsWatchedClick);
    if (prevFilmComponent === null) {
      render(this._filmCardContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this._filmCardContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }
    remove(prevFilmComponent);
  }

  _handleOpenFilmDetailsClick() {
    this._showFilmDetails(this._film);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _changeEventButtons(eventType) {
    const copyFilm = {...this._film};
    const filmUserDetails = copyFilm.userDetails;
    switch (eventType) {
      case EventType.FAVORITE: {
        filmUserDetails.favorite = !this._film.userDetails.favorite;
        break;
      }
      case EventType.WATCHLIST: {
        filmUserDetails.watchlist = !this._film.userDetails.watchlist;
        break;
      }
      case EventType.HISTORY: {
        filmUserDetails.alreadyWatched = !this._film.userDetails.alreadyWatched;
        break;
      }
    }
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, copyFilm);
  }

  _handleFavoriteClick() {
    this._changeEventButtons(EventType.FAVORITE);
  }

  _handleWatchListClick() {
    this._changeEventButtons(EventType.WATCHLIST);
  }

  _handleAsWatchedClick() {
    this._changeEventButtons(EventType.HISTORY);
  }

  // _renderPopup() {
  //   // Метод создания попапа
  //   document.querySelector('body').classList.add('hide-overflow');
  //   document.querySelector('body').appendChild(this._popupComponent.getElement());
  //   this._setActiveFilm(this._film);
  //   // сделать условие удаляющее повторную отрисовку из инита
  //   if(!this._newCommentForm) {
  //   this._renderComments();
  //   render(this._popupComponent.getElement().querySelector('.film-details__comments-wrap'), new PopupNewCommentForm(this._film), RenderPosition.BEFOREEND);
  //   }
  // }

  // _removePopup() {
  //   // Метод удаления попапа
  //   document.querySelector('body').removeChild(this._popupComponent.getElement());
  //   document.querySelector('body').classList.remove('hide-overflow');
  //   this._newCommentForm = null;
  //   remove(this._popupComponent);
  //   this._setActiveFilm(null);
  // }

  // _renderComments() {
  //   this._comments = this._film.comments;
  //   // this._commentsNumber.textContent = this._comments.length;
  //   this._comments.forEach((commentItem) => {
  //     const comment = new CommentItem(commentItem);
  //     // comment.setCommentDeleteCallback(this._handleCommentDeletion);
  //     render(this._popupComponent.getElement().querySelector('.film-details__comments-list'), comment, RenderPosition.BEFOREEND);
  //     // this._shownComments.set(commentItem.id, comment.getElement());
  //   });
  // }

  // _escKeyDownHandler(evt) {
  //   if (evt.key === KeyboardKey.ESCAPE) {
  //     evt.preventDefault();
  //     this._removePopup();
  //     this._setActiveFilm(null);
  //     document.removeEventListener('keydown', this._escKeyDownHandler);
  //   }
  // }

  // _hidePopup() {
  //   document.querySelector('.film-details').remove();
  // }

  // _openPopupClickHandler() {
  //   // Метод открытия попапа при нажатии на постер
  //   if (document.body.querySelector('.film-details')) {
  //     this._hidePopup();
  //   }
  //   this._renderPopup();
  //   document.addEventListener('keydown', this._escKeyDownHandler);
  //   this._popupComponent.setClosePopupButtonHandler(() => {
  //     this._removePopup();
  //   });
  // }
}

export default Film;
