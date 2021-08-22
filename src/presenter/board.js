import ShowmoreBtnView from '../view/morebtn.js';
import SortTemplateView from '../view/sort.js';
import FilmBoardTemplateView from '../view/filmboard.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import FilmListView from '../view/filmlist.js';
import FilmPresenter from './movie.js';
import FilmListContainerView from '../view/flim-listcontainer.js';
import {updateItem} from '../utils/common.js';
import NoFilmsView from '../view/no-film.js';

const FILM_COUNT_PER_STEP = 5;

class Board {
  constructor(filmListBoard) {
    this._filmListBoard = filmListBoard;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = new Map();

    this._filmListMain = new FilmListView();
    this._noFilmComponents = new NoFilmsView();
    this._filmListComponent = new FilmBoardTemplateView();
    this._filmListContainer = new FilmListContainerView();
    this._sortComponent = new SortTemplateView();
    this._showMoreBtnComponent = new ShowmoreBtnView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    render(this._filmListBoard, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListMain, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  _renderSort() {
    render(this._filmListComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmListContainer, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
    // Метод для рендеринга N-задач за раз
  }

  _renderNoFilms() {
    render(this._filmListComponent, this._noFilmComponents, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._showMoreBtnComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmListMain, this._showMoreBtnComponent, RenderPosition.BEFOREEND);
    this._showMoreBtnComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));
    if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreBtnComponent);
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js;
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
    }
    render(this._filmListMain, this._filmListContainer, RenderPosition.BEFOREEND);
    this._renderSort();
    this._renderFilmList();
  }
}

export default Board;