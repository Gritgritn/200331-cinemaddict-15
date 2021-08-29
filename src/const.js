const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const SortType = {
  DEFAULT: 'default',
  DATE: 'date-down',
  RATE: 'date-up',
};

const KeyboardKey = {
  ESCAPE: 'Escape',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
};

const FilterType = {
  ALL_MOVIES: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {EMOTIONS, SortType, KeyboardKey, UserAction, UpdateType, FilterType};
export default KeyboardKey;
