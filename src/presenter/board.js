import FilmCardView from './view/card.js';
import ShowmoreBtnView from './view/morebtn.js';
import SortTemplateView from './view/sort.js';
import FilmBoardTemplateView from './view/filmboard.js';
import {render, RenderPosition} from './utils/render.js';
import FilmListView from './view/filmlist.js';

const FILM_COUNT_PER_STEP = 5;
const EXTRA_CARD_COUNT = 2;

class Board {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmListMain = new FilmListView();
    this._mainContainer = siteMainElement;
    this._filmListComponent = new FilmBoardTemplateView();
    this._sortComponent = new SortTemplateView();
    this._filmListContainer = new FilmListContainerView();
    this._showMoreComponent = new ShowmoreBtnView();
    // this._noFilmComponent = new NoFilmView();
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    render(this._filmListContainer, this._filmListComponent, RenderPosition.BEFOREEND);
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._renderBoard
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    const filmComponent = new FilmCardView(film);
    const PopupComponent = new PopupTemplateView(film);

  const createPopupComponent = () => {
    document.querySelector('body').classList.add('hide-overflow');
    BodyElement.appendChild(PopupComponent.getElement());
  };
  const removePopupComponent = () => {
    BodyElement.removeChild(PopupComponent.getElement());
    document.querySelector('body').classList.remove('hide-overflow');
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      removePopupComponent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  render(this._filmListContainer, filmComponent, RenderPosition.BEFOREEND);

  filmComponent.setPosterClickHandler(() => {
    createPopupComponent();
    document.addEventListener('keydown', onEscKeyDown);
    PopupComponent.setClosePopupButtonHandler(() => {
      removePopupComponent();
    });
  });
  filmComponent.setFilmNameClickHandler(() => {
    createPopupComponent();
    document.addEventListener('keydown', onEscKeyDown);
    PopupComponent.setClosePopupButtonHandler(() => {
      removePopupComponent();
    });
  });
  filmComponent.setAllCommentsClickHandler(() => {
    createPopupComponent();
    document.addEventListener('keydown', onEscKeyDown);
    PopupComponent.setClosePopupButtonHandler(() => {
      removePopupComponent();
    });
  });
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderTask(boardFilm));
    // Метод для рендеринга N-задач за раз
  }

  _renderNoFilms() {
    // Метод для рендеринга заглушки
  }

  _renderShowMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderFilm в main.js
    let renderedFilmCount = FILM_COUNT_PER_STEP;
    const showMoreBtnComponent = new ShowmoreBtnView();
    render(_filmListMain, showMoreBtnComponent, RenderPosition.BEFOREEND);

    showMoreBtnComponent.setClickHandler(() => {
      this._boardFilms
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmListContainer, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= this._boardFilms.length) {
        showMoreBtnComponent.getElement().remove();
        showMoreBtnComponent.removeElement();
      }
    });
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._boardTasks.length, FILM_COUNT_PER_STEP));

    if (this._boardTasks.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }
  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
    this._renderSort();
    this._renderFilms(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));
    if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
    this._renderFilmList();
  }
}

export default Board;
