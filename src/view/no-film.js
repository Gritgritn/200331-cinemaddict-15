import Abstract from './abstract.js';
import {FilterType} from '../const.js';

const noFilmsTextType = {
  [FilterType.ALL_MOVIES]: 'There are no movies in our database',
  [FilterType.WATCHLIST]:'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createNoFilmLsTemplate = (filterType) => {
  const noFilmsTextValue = noFilmsTextType[filterType];

  return(
    `<section class="films-list">
      <h2 class="films-list__title">${noFilmsTextValue}</h2>
    </section>`);
};

class NoFilms extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoFilmLsTemplate(this._data);
  }
}

export default NoFilms;
