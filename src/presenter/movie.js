import FilmCardView from '../view/card.js';
import PopupTemplateView from '../view/popup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {nanoid} from 'nanoid';

class Film {
  constructor(filmCardContainer) {
    this._filmCardContainer = filmCardContainer;
    this._popupComponent = null;
    this._filmCardComponent = null;
    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._popupComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupTemplateView(film);
    this._filmCardComponent.setPosterClickHandler(this._openPopupClickHandler);
    this._filmCardComponent.setFilmNameClickHandler(this._openPopupClickHandler);
    this._filmCardComponent.setAllCommentsClickHandler(this._openPopupClickHandler);

    // render(this._filmCardContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._filmCardContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._filmCardContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    if (this._filmCardContainer.getElement().contains(prevFilmPopupComponent.getElement())) {
      replace(this._popupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmEditComponent);
  }

  destroy() {
    remove(this._filmComponent);
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
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._removePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _openPopupClickHandler() {
    // Метод открытия попапа при нажатии на постер
    this._renderPopup();
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._popupComponent.setClosePopupButtonHandler(() => {
    this._removePopup();
    });
  }
}

export default Film;
