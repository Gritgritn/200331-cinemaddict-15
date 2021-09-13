import ShowmoreBtnView from '../view/morebtn.js';
import SortTemplateView from '../view/sort.js';
import FilmBoardTemplateView from '../view/filmboard.js';
import NoFilmsView from '../view/no-film.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import FilmListView from '../view/filmlist.js';
import FilmPresenter from './movie.js';
import FilmListContainerView from '../view/flim-listcontainer.js';
import {sortByDate, sortByRating} from '../utils/common.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {filter} from '../utils/filters.js';
import FilmDetailsPresenter from './film-details.js';
import EmptyBoardView from '../view/empty-board.js';

const FILM_COUNT_PER_STEP = 5;

class Board {
  constructor(filmListBoard, filmsModel, filterModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmListBoard = filmListBoard;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = new Map();
    this._filterType = FilterType.ALL;
    this._isLoading = true;
    this._api = api;

    this._filmListMain = new FilmListView();
    this._filmListComponent = new FilmBoardTemplateView();
    this._filmListContainer = new FilmListContainerView();
    this._loadingComponent = new EmptyBoardView();
    this._sortComponent = null;
    this._showMoreBtnComponent = null;
    this._noFilmComponent = null;

    this._showFilmDetails = this._showFilmDetails.bind(this);

    this._hideFilmDetails = this._hideFilmDetails.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._currentSortType = SortType.DEFAULT;

    render(this._filmListBoard, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListMain, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _showFilmDetails(film) {
    if (this._filmDetailsPresenter &&
        this._filmDetailsPresenter.filmId !== film.id) {
      this._filmDetailsPresenter.destroy();
      this._filmDetailsPresenter = new FilmDetailsPresenter(this._filmListBoard, this._filmsModel, this._handleViewAction, this._hideFilmDetails);
    }

    if (!this._filmDetailsPresenter) {
      this._filmListBoard.classList.add('hide-overflow');
      this._filmDetailsPresenter = new FilmDetailsPresenter(this._filmListBoard, this._filmsModel, this._handleViewAction, this._hideFilmDetails);
    }

    this._filmDetailsPresenter.init(film);
  }

  _hideFilmDetails() {
    this._filmListBoard.classList.remove('hide-overflow');
    this._filmDetailsPresenter.destroy();
    this._filmDetailsPresenter = null;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM: {
        // this._filmsModel.updateFilm(updateType, update);
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        });
        break;
      }
      case UserAction.DELETE_COMMENT: {
        this._filmsModel.deleteComment(updateType, update);
        break;
      }
      case UserAction.CREATE_COMMENT: {
        this._filmsModel.createComment(updateType, update);
        break;
      }
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH: {
        this._filmPresenter.get(data.id).init(data);
        break;
      }
      case UpdateType.MINOR: {
        this._clearBoard();
        this._renderBoard();
        break;
      }
      case UpdateType.MAJOR: {
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
      }
      case UpdateType.INIT: {
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
      }
    }
  }

  _renderLoading() {
    render(this._filmListBoard, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _getFilms() {
    this._filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE: {
        return filtredFilms.sort(sortByDate);
      }
      case SortType.RATE: {
        return filtredFilms.sort(sortByRating);
      }
    }
    return filtredFilms;
  }

  _handleFilmChange(updatedFilm) {
    this._filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortTemplateView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmListComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmListContainer, this._handleViewAction, this._showFilmDetails);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    this._noFilmComponent = new NoFilmsView(this._filterType);
    render(this._filmListComponent, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreBtnComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreBtnComponent !== null) {
      this._showMoreBtnComponent = null;
    }
    this._showMoreBtnComponent = new ShowmoreBtnView();
    this._showMoreBtnComponent.setClickHandler(this._handleShowMoreButtonClick);
    render(this._filmListMain, this._showMoreBtnComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));
    this._renderFilms(films);
    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  destroy() {
    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    remove(this._filmListComponent);
    remove(this._sortComponent);
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();


    if (this._showMoreBtnComponent) {
      remove(this._showMoreBtnComponent);
    }

  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();

    remove(this._sortComponent);
    if (this._noFilmComponent) {
      remove(this._noFilmComponent);
    }
    remove(this._loadingComponent);
    remove(this._showMoreBtnComponent);


    this._renderedFilmCount = resetRenderedFilmCount ? FILM_COUNT_PER_STEP : Math.min(filmCount, this._renderedFilmCount);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const films = this._getFilms();
    const filmCount = films.length;
    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }
    render(this._filmListMain, this._filmListContainer, RenderPosition.BEFOREEND);
    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }
}

export default Board;
