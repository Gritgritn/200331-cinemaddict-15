import dayjs from 'dayjs';
import {createElement} from '../utils.js';

const createFilmCard = (film) => {
  const {moviename, poster, description, premiereDate, rating, genre, runtime, isInWatchlist, isWatched, isFavorite} = film;
  const date = dayjs(premiereDate).format('YYYY');
  const hours = Math.floor(runtime / 60);
  const minutes = Math.floor(runtime) - (hours * 60);
  let slicedDescription = description.slice(0, 140);
  if (slicedDescription.length < description.length) {
    slicedDescription += ' ...';
  }
  const watchlistClassName = isInWatchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';
  const watchedClassName = isWatched
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';
  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  return `<article class="film-card">
        <h3 class="film-card__title">${moviename}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${date}</span>
          <span class="film-card__duration">${hours} h ${minutes} m</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${slicedDescription}</p>
        <a class="film-card__comments">5 comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item  ${watchlistClassName}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item ${watchedClassName}" type="button">Mark as watched</button>
          <button class="film-card__controls-item ${favoriteClassName}" type="button">Mark as favorite</button>
        </div>
      </article>`;
};

class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmCard;
