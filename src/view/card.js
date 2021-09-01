import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createFilmCard = (film) => {
  // const {moviename, poster, description, premiereDate, rating, genre, runtime, isInWatchlist, isWatched, isFavorite} = film;
  const {id, comments, filmInfo, userDetails} = film;
  const formatDate = (date, format) => dayjs(date).format(format);
  const getShortDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      description = `${description.substr(0, maxLength)}...`;
    }
    return description;
  };
  const getDurationFromMinutes = (durationInMinutes) => {
    const lasting = dayjs.duration(durationInMinutes, 'minutes');
    return `${lasting.hours()}h ${lasting.minutes()}m`;
  };
  const releaseYear = formatDate(filmInfo.release.date, 'YYYY').slice(-4) || '';
  const runtime = getDurationFromMinutes(filmInfo.runtime) || '';

  // const date = dayjs(premiereDate).format('YYYY');
  // const hours = Math.floor(runtime / 60);
  // const minutes = Math.floor(runtime) - (hours * 60);
  // let slicedDescription = description.slice(0, 140);
  // if (slicedDescription.length < description.length) {
  //   slicedDescription += ' ...';
  // }
  // const watchlistClassName = isInWatchlist
  //   ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
  //   : 'film-card__controls-item--add-to-watchlist';
  // const watchedClassName = isWatched
  //   ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
  //   : 'film-card__controls-item--mark-as-watched';
  // const favoriteClassName = isFavorite
  //   ? 'film-card__controls-item--favorite film-card__controls-item--active'
  //   : 'film-card__controls-item--favorite';

  return `<article class="film-card" data-id="${id}">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseYear}</span>
          <span class="film-card__duration">${runtime}</span>
          <span class="film-card__genre">${filmInfo.genre}</span>
        </p>
        <img src="${filmInfo.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${getShortDescription(filmInfo.description, 140)}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button" data-details="watchlist">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button" data-details="alreadyWatched">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button" data-details="favorite">Mark as favorite</button>
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
