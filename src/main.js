import {createSiteMenuTemplate} from './view/menu.js';
import {createFilmCard} from './view/card.js';
import {createShowmoreBtn} from './view/morebtn.js';
import {createUserTitle} from './view/usertitle.js';
import {createFooterStatisticTemplate} from './view/footerstatistic.js';
import {CreatePopupElement} from './view/popup.js';

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, createUserTitle(), 'beforeend');

const siteMainElement = document.querySelector('.main');
render(siteMainElement, createSiteMenuTemplate(), 'afterBegin');


const boardElement = siteMainElement.querySelector('.films-list');
const filmCardElement = boardElement.querySelector('.films-list__container');
for (let i = 0; i < MAIN_CARD_COUNT; i++) {
  render(filmCardElement, createFilmCard(), 'beforeend');
}

const ShowMoreElement = siteMainElement.querySelector('.films-list');
render(ShowMoreElement, createShowmoreBtn(), 'beforeend');


const extraFilmList = siteMainElement.querySelector('.films-list--extra');
const extraFilmCardElement = extraFilmList.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(extraFilmCardElement, createFilmCard(), 'beforeend');
}


const commentedFilmList = siteMainElement.querySelector('.films-list--commented');
const mama = commentedFilmList.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(mama, createFilmCard(), 'beforeend');
}

const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, createFooterStatisticTemplate(), 'beforeend');

const sitePopupElement = document.querySelector('.footer');
render(sitePopupElement, CreatePopupElement(), 'afterend');