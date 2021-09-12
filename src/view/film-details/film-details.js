import dayjs from 'dayjs';
import {formatItems} from '../../utils/common.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import AbstractView from '../abstract.js';

dayjs.extend(relativeTime);

const CreatePopupElement = (film) => {
  const {id, filmInfo, userDetails} = film;
  const formatDate = (date, format) => dayjs(date).format(format);
  const getDurationFromMinutes = (durationInMinutes) => {
    const lasting = dayjs.duration(durationInMinutes, 'minutes');
    return `${lasting.hours()}h ${lasting.minutes()}m`;
  };
  const releaseDate= formatDate(filmInfo.release.date,'DD MMMM YYYY');
  const runtime = getDurationFromMinutes(filmInfo.runtime) || '';
  const genresTitle = filmInfo.genre.length > 1 ? 'Gengres' : 'Genre';

  return `<section class="film-details" data-id="${id}">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

          <p class="film-details__age">${filmInfo.ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${formatItems(filmInfo.writers)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${formatItems(filmInfo.actors)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genresTitle}</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${formatItems(filmInfo.genre)}</span>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${filmInfo.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${userDetails.watchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${userDetails.alreadyWatched ? 'film-details__control-button--active' : ''}" id="alreadyWatched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${userDetails.favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>
  </form>
  </section>`;
};

class PopupTemplate extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._popupCloseClickHandler = this._popupCloseClickHandler.bind(this);
    this.restoreHandlers();
  }

  getTemplate() {
    return CreatePopupElement(this._film);
  }

  get scrollTop() {
    return this.getElement().scrollTop;
  }

  set scrollTop(value) {
    this.getElement().scrollTop = value;
  }

  _popupCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  restoreHandlers() {
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoritesClickHandler);
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedClickHandler);
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseClickHandler);
  }

  setAddFavoriteButtonClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoritesClickHandler);
  }

  setMarkAsWatchedPopupButtonClick(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedClickHandler);
  }

  setAddToWatchlistPopupButtonClick(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setClosePopupButtonHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseClickHandler);
    this.restoreHandlers();
  }
}

export default PopupTemplate;
