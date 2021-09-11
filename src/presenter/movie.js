import FilmCardView from '../view/card.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {UserAction, UpdateType, EventType} from '../const.js';

class Film {
  constructor(filmCardContainer, changeData, showFilmDetails) {
    this._showFilmDetails = showFilmDetails;
    this._filmCardContainer = filmCardContainer;
    this._changeData = changeData;
    this._filmCardComponent = null;
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAsWatchedClick = this._handleAsWatchedClick.bind(this);
    this._handleOpenFilmDetailsClick = this._handleOpenFilmDetailsClick.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._bodyContainer = document.querySelector('body');
    this._filmCardComponent.setPosterClickHandler(this._handleOpenFilmDetailsClick);
    this._filmCardComponent.setFilmNameClickHandler(this._handleOpenFilmDetailsClick);
    this._filmCardComponent.setAllCommentsClickHandler(this._handleOpenFilmDetailsClick);

    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setAsWatchedClickHandler(this._handleAsWatchedClick);
    if (prevFilmComponent === null) {
      render(this._filmCardContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this._filmCardContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }
    remove(prevFilmComponent);
  }

  _handleOpenFilmDetailsClick() {
    this._showFilmDetails(this._film);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _changeEventButtons(eventType) {
    const copyFilm = {...this._film};
    const filmUserDetails = copyFilm.userDetails;
    switch (eventType) {
      case EventType.FAVORITE: {
        filmUserDetails.favorite = !this._film.userDetails.favorite;
        break;
      }
      case EventType.WATCHLIST: {
        filmUserDetails.watchlist = !this._film.userDetails.watchlist;
        break;
      }
      case EventType.HISTORY: {
        filmUserDetails.alreadyWatched = !this._film.userDetails.alreadyWatched;
        break;
      }
    }
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, copyFilm);
  }

  _handleFavoriteClick() {
    this._changeEventButtons(EventType.FAVORITE);
  }

  _handleWatchListClick() {
    this._changeEventButtons(EventType.WATCHLIST);
  }

  _handleAsWatchedClick() {
    this._changeEventButtons(EventType.HISTORY);
  }
}

export default Film;
