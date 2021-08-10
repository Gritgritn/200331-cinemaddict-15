import MenuTemplateView from './view/menu.js';
import FilmCardView from './view/card.js';
import ShowmoreBtnView from './view/morebtn.js';
import UserTitleView from './view/usertitle.js';
import FooterStatisticView from './view/footerstatistic.js';
import PopupTemplateView from './view/popup.js';
import {generateFilm} from './mock/film.js';
import SortTemplateView from './view/sort.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';
// import NoFilmView from './view/no-film';

const EXTRA_CARD_COUNT = 2;
const FILM_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const PopupComponent = new PopupTemplateView(film);

  const createPopupComponent = () => {
    document.querySelector('body').classList.add('hide-overflow');
    PopupElement.appendChild(PopupComponent.getElement());
  };

  const removePopupComponent = () => {
    PopupElement.removeChild(PopupComponent.getElement());
    document.querySelector('body').classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      removePopupComponent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

  filmCardElement.querySelector('.film-card__poster').addEventListener('click', () => {
    createPopupComponent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  filmCardElement.querySelector('.film-card__title').addEventListener('click', () => {
    createPopupComponent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  filmCardElement.querySelector('.film-card__comments').addEventListener('click', () => {
    createPopupComponent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  // PopupElement.querySelector('.film-details__close-btn"').addEventListener('click', () => {
  //   removePopupComponent();
  // });
};

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, new UserTitleView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
render(siteMainElement, new SortTemplateView().getElement(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new MenuTemplateView(filters).getElement(), RenderPosition.AFTERBEGIN);


const boardElement = siteMainElement.querySelector('.films-list');
const filmCardElement = boardElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmCardElement, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  const showMoreBtnComponent = new ShowmoreBtnView();
  render(boardElement, showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreBtnComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmCardElement, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreBtnComponent.getElement().remove();
      showMoreBtnComponent.removeElement();
    }
  });
}


const extraFilmList = siteMainElement.querySelector('.films-list--extra');
const extraFilmCardElement = extraFilmList.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  renderFilm(extraFilmCardElement, films[i]);
}


const commentedFilmList = siteMainElement.querySelector('.films-list--commented');
const topCommented = commentedFilmList.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  renderFilm(topCommented, films[i]);
}

const siteFooterElement = document.querySelector('.footer');
const PopupElement = document.querySelector('body');
render(siteFooterElement, new FooterStatisticView().getElement(), RenderPosition.BEFOREEND);
