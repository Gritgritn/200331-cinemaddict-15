import {createFilterTemplate} from './view/menu.js';
import {createFilmCard} from './view/card.js';
import {createShowmoreBtn} from './view/morebtn.js';
import {createUserTitle} from './view/usertitle.js';
import {createFooterStatisticTemplate} from './view/footerstatistic.js';
import {CreatePopupElement} from './view/popup.js';
import {generateFilm} from './mock/film.js';
// import {generateMovieComment} from './mock/film.js';
import {createSortTemplate} from './view/sort.js';
import {generateFilter} from './mock/filter.js';


const EXTRA_CARD_COUNT = 2;
const FILM_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;


const films = new Array(FILM_COUNT).fill().map(generateFilm);
// const comments = new Array(4).fill().map(generateMovieComment);
const filters = generateFilter(films);


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, createUserTitle(), 'beforeend');

const siteMainElement = document.querySelector('.main');
render(siteMainElement, createSortTemplate(), 'afterBegin');
render(siteMainElement, createFilterTemplate(filters), 'afterBegin');


const boardElement = siteMainElement.querySelector('.films-list');
const filmCardElement = boardElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmCardElement, createFilmCard(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(boardElement, createShowmoreBtn(), 'beforeend');
  const ShowMoreElement = siteMainElement.querySelector('.films-list');
  const showMoreButton = ShowMoreElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render (filmCardElement, createFilmCard(film), 'beforeend'));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove()
    }
  });
};


const extraFilmList = siteMainElement.querySelector('.films-list--extra');
const extraFilmCardElement = extraFilmList.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(extraFilmCardElement, createFilmCard(films[i]), 'beforeend')
}


const commentedFilmList = siteMainElement.querySelector('.films-list--commented');
const topCommented = commentedFilmList.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(topCommented, createFilmCard(films[i]), 'beforeend');
}

const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, createFooterStatisticTemplate(), 'beforeend');

const sitePopupElement = document.querySelector('.footer');
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(sitePopupElement, CreatePopupElement(films[i]), 'afterend');
}
