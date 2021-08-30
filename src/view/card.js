import dayjs from 'dayjs';
import AbstractView from './abstract.js';


const createFilmCard = (card) => {
  const {film, comments} = card;
  const {filmInfo, userDetails} = film;
  const {title, totalRating, releaseFilm, runtime, genre, poster, description} = filmInfo;
  const {date} = releaseFilm;
  const {watchlist, already_watched, favorite} = userDetails;
  const dateYear = dayjs(date).format('YYYY');

  // const date = dayjs(premiereDate).format('YYYY');
  const hours = Math.floor(runtime / 60);
  const minutes = Math.floor(runtime) - (hours * 60);
  const isClassName = (boolean) =>  boolean ? 'film-card__controls-item--active' : '';

  let slicedDescription = description.slice(0, 140);
  if (slicedDescription.length < description.length) {
    slicedDescription += ' ...';
  }

  return `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${dateYear}</span>
          <span class="film-card__duration">${hours} h ${minutes} m</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${slicedDescription}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isClassName(watchlist)}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isClassName(already_watched)}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${isClassName(favorite)}" type="button">Mark as favorite</button>
        </div>
      </article>`;
};

class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._asWatchedClickHandler = this._asWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  _popupClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _asWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.asWatchedClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setAsWatchedClickHandler(callback) {
    this._callback.asWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._asWatchedClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListClickHandler);
  }

  setPosterClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._popupClickHandler);
  }

  setFilmNameClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._popupClickHandler);
  }

  setAllCommentsClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._popupClickHandler);
  }
}

export default FilmCard;
