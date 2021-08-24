import FilmCardView from '../view/card.js';
import PopupTemplateView from '../view/popup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {KeyboardKey} from '../const.js';

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
    }

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
  }

  _removePopup() {
    // Метод удаления попапа
    document.querySelector('body').removeChild(this._popupComponent.getElement());
    document.querySelector('body').classList.remove('hide-overflow');
  }


  _escKeyDownHandler(evt) {
    if (evt.key === KeyboardKey.ESCAPE) {
      evt.preventDefault();
      this._removePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleWatchListClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _handleAsWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _hidePopup() {
    document.querySelector('.film-details').remove();
  }

  _openPopupClickHandler() {
    // Метод открытия попапа при нажатии на постер
    if (document.body.querySelector('.film-details')) {
      this._hidePopup();
    }
    this._renderPopup();
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._popupComponent.setClosePopupButtonHandler(() => {
      this._removePopup();
    });
  }
}

export default Film;
