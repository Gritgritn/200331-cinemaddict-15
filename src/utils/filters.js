import {FilterType} from '../const.js';

export const filter = {
  [FilterType.ALL_MOVIES]:(films) => films.filter((film) => film),
  [FilterType.WATCHLIST]:(films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) =>  films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
