import MenuTemplateView from './view/menu.js';
import FilmCardView from './view/card.js';
import ShowmoreBtnView from './view/morebtn.js';
import UserTitleView from './view/usertitle.js';
import FooterStatisticView from './view/footerstatistic.js';
import PopupTemplateView from './view/popup.js';
import {generateFilm} from './mock/film.js';
import SortTemplateView from './view/sort.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';
import FilmBoardTemplateView from './view/filmboard.js';
import FilmListView from './view/filmlist.js';
import FilmListContainerView from './view/flim-listcontainer.js';
import MostCommentedListView from './view/mostcommented.js';
import TopRatedView from './view/toprated.js';
// import NoFilmView from './view/no-film';

const EXTRA_CARD_COUNT = 2;
const FILM_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const BodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, new UserTitleView(), RenderPosition.BEFOREEND);

const renderFilm = (filmListElement, film) => {
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

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);

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
};

render(siteMainElement, new MenuTemplateView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortTemplateView(), RenderPosition.BEFOREEND);

const renderFilmList = (filmsContainer, filmListFilms) => {
  const filmBoard = new FilmBoardTemplateView();
  const filmsList = new FilmListView();
  const filmListContainer = new FilmListContainerView();
  render(filmsContainer, filmBoard, RenderPosition.BEFOREEND);
  render(filmBoard, filmsList, RenderPosition.BEFOREEND)
  render(filmsList, filmListContainer, RenderPosition.BEFOREEND)


  for (let i = 0; i < Math.min(filmListFilms.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmListContainer, filmListFilms[i]);
  }

  if (filmListFilms.length > FILM_COUNT_PER_STEP) {


    let renderedFilmCount = FILM_COUNT_PER_STEP;
    const showMoreBtnComponent = new ShowmoreBtnView();
    render(filmsList, showMoreBtnComponent, RenderPosition.BEFOREEND);

    showMoreBtnComponent.setClickHandler(() => {
      filmListFilms
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmListContainer, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= filmListFilms.length) {
        showMoreBtnComponent.getElement().remove();
        showMoreBtnComponent.removeElement();
      }
    });
  }


  const mostCommentedList = new MostCommentedListView();
  render(filmBoard, mostCommentedList, RenderPosition.BEFOREEND)
  const mostCommentedContainer = mostCommentedList.getElement().querySelector('.films-list__container');
  for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
    renderFilm(mostCommentedContainer, films[i]);
  }

  const topRatedList = new TopRatedView();
  render(filmBoard, topRatedList, RenderPosition.BEFOREEND)
  const topRatedContainer = topRatedList.getElement().querySelector('.films-list__container');
  for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
    renderFilm(topRatedContainer, films[i]);
  }
}

renderFilmList(siteMainElement, films);

render(siteFooterElement, new FooterStatisticView(), RenderPosition.BEFOREEND);
