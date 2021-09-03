import FilmCardView from '../view/card.js';
import PopupTemplateView from '../view/popup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {KeyboardKey, UserAction, UpdateType, EventType} from '../const.js';
import CommentItem from '../view/popup-comment.js';
import PopupNewCommentForm from '../view/popup-new-comment.js';

class Film {
  constructor(filmCardContainer, changeData) {
    this._filmCardContainer = filmCardContainer;
    this._changeData = changeData;
    this._popupComponent = null;
    this._filmCardComponent = null;
    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._removePopup = this._removePopup.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAsWatchedClick = this._handleAsWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._popupComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupTemplateView(film);
    this._activeFilmId = null;
    this._bodyContainer = document.querySelector('body');
    this._filmCardComponent.setPosterClickHandler(this._openPopupClickHandler);
    this._filmCardComponent.setFilmNameClickHandler(this._openPopupClickHandler);
    this._filmCardComponent.setAllCommentsClickHandler(this._openPopupClickHandler);

    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setAsWatchedClickHandler(this._handleAsWatchedClick);

    this._popupComponent.setClosePopupButtonHandler(this._removePopup);
    this._popupComponent.setFavoritePopupButtonClick(this._handleFavoriteClick);
    this._popupComponent.setAddToWatchlistPopupButtonClick(this._handleWatchListClick);
    this._popupComponent.setMarkAsWatchedPopupButtonClick(this._handleAsWatchedClick);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._filmCardContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима, чтобы не пытаться заменить то, что не было отрисовано
    if (this._filmCardContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    if (this._bodyContainer.contains(prevFilmPopupComponent.getElement())) {
      replace(this._popupComponent, prevFilmPopupComponent);
    } // эти условия не работают, из-за этого попап не перерисовывается

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  _renderPopup() {
    // Метод создания попапа
    document.querySelector('body').classList.add('hide-overflow');
    document.querySelector('body').appendChild(this._popupComponent.getElement());
    this._renderComments();
    render(this._popupComponent.getElement().querySelector('.film-details__comments-wrap'), new PopupNewCommentForm(this._film), RenderPosition.BEFOREEND);
  }

  _removePopup() {
    // Метод удаления попапа
    document.querySelector('body').removeChild(this._popupComponent.getElement());
    document.querySelector('body').classList.remove('hide-overflow');
    remove(this._popupComponent);

  }

  _renderComments() {
    this._comments = this._film.comments;
    // this._commentsNumber.textContent = this._comments.length;
    this._comments.forEach((commentItem) => {
      const comment = new CommentItem(commentItem);
      // comment.setCommentDeleteCallback(this._handleCommentDeletion);
      render(this._popupComponent.getElement().querySelector('.film-details__comments-list'), comment, RenderPosition.BEFOREEND);
      // this._shownComments.set(commentItem.id, comment.getElement());
    });
  }

  _escKeyDownHandler(evt) {
    if (evt.key === KeyboardKey.ESCAPE) {
      evt.preventDefault();
      this._removePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleFavoriteClick() {
    this._changeEventButtons(EventType.FAVORITE);
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

  _handleWatchListClick() {
    this._changeEventButtons('WatchList');
  }

  _handleAsWatchedClick() {
    this._changeEventButtons('History');
  }

  _hidePopup() {
    document.querySelector('.film-details').remove();
  }

  // set setActiveFilm(value) {
  //   this._activeFilmId = value;
  // };

  _openPopupClickHandler() {
    // Метод открытия попапа при нажатии на постер
    if (document.body.querySelector('.film-details')) {
      this._hidePopup();
    }
    this._renderPopup();
    // setActiveFilm(1);
    // с синтаксом всё-таки возникли проблемы
    // сначала думал можно так: this._activeFilmId.set(film.id); но выдаёт ошибку
    // можешь пожалуйста написать как, а то нашёл только примеры на переменных
    // ещё одна проблема постер открывается не через board.js, а через этот файл
    // как понимаю эту проблему можно решить передав film.id через _renderFilm()
    // при вызове этого файла в конструктор передать значение film.id и использовать его в сеттере уже
    // например const filmPresenter = new FilmPresenter(this._filmListContainer, this._handleViewAction, film.id);
    // и уже с условием if (this._activeFilmId !== null) вызвать отрисовку попапа при отрисовке карточки фильма в init

    document.addEventListener('keydown', this._escKeyDownHandler);
    this._popupComponent.setClosePopupButtonHandler(() => {
      this._removePopup();
    });
  }
}

export default Film;
