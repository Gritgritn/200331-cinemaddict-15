import {FilterType} from '../const.js';

export const filter = {
  [FilterType.ALL_MOVIES]:(films) => films.filter((film) => film),
  [FilterType.WATCHLIST]:(films) => films.filter((film) => film.film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) =>  films.filter((film) => film.film.userDetails.already_watched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.film.userDetails.favorite),
};
