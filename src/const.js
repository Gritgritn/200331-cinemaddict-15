const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const SortType = {
  DEFAULT: 'default',
  DATE: 'date-down',
  RATE: 'date-up',
};

const Screen = {
  FILMS: 'FILMS',
  STATISTIC: 'STATISTIC',
};

const EventType = {
  FAVORITE: 'Favorite',
  WATCHLIST: 'WatchList',
  HISTORY: 'History',
};

const NEW_COMMENT_DEFAULT = {
  text: '',
  emotion: '',
};

const KeyboardKey = {
  ESCAPE: 'Escape',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  CREATE_COMMENT: 'create-comment',
  DELETE_COMMENT: 'delete-comment',
  UPDATE_FILM_USER_DETAILS: 'updtae-film-user-details',
};

const FilterType = {
  ALL_MOVIES: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
  STATS: 'stats',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const Rank = {
  NONE: 'NONE',
  NOVICE: 'NOVICE',
  FAN: 'FAN',
  MOVIE_BUFF: 'MOVIE_BUFF',
};

const RankToTextContent = {
  NONE: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

export {RankToTextContent, EMOTIONS, NEW_COMMENT_DEFAULT, SortType, KeyboardKey, UserAction, UpdateType, FilterType, EventType, Screen, Rank};
export default KeyboardKey;
