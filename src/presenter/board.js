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

const FILM_COUNT_PER_STEP = 5;

class Board {
  constructor(filmListBoard, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmListBoard = filmListBoard;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = new Map();
    this._filterType = FilterType.ALL;
    this._currentSortType = SortType.DEFAULT;

    this._filmListMain = new FilmListView();
    this._filmListComponent = new FilmBoardTemplateView();
    this._filmListContainer = new FilmListContainerView();
    this._sortComponent = null;
    this._showMoreBtnComponent = null;
    this._noFilmComponent = null;
    this._activeFilm = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleActiveFilm = this._handleActiveFilm.bind(this);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._filmListBoard, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListMain, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM: {
        this._filmsModel.updateFilm(updateType, update);
        break;
      }
    }
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
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
    }
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
    console.log(this._activeFilm);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmListContainer, this._handleViewAction, this._handleActiveFilm);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
    if (this._activeFilm) {
      new FilmPresenter(this._filmListContainer, this._handleViewAction, this._handleActiveFilm);
    }
  }

  _handleActiveFilm(film) {
    this._activeFilm = film;
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

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreBtnComponent);
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();

    remove(this._sortComponent);
    if (this._noFilmComponent) {
      remove(this._noFilmComponent);
    }
    remove(this._showMoreBtnComponent);


    this._renderedFilmCount = resetRenderedFilmCount ? FILM_COUNT_PER_STEP : Math.min(filmCount, this._renderedFilmCount);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
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
