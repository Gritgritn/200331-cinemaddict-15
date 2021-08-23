import MenuTemplateView from './view/menu.js';
import UserTitleView from './view/usertitle.js';
import FooterStatisticView from './view/footerstatistic.js';
import {generateFilm, generateComment} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';
import BoardPresenter from './presenter/board.js';


const FILM_COUNT = 15;


const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const filmPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new UserTitleView(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuTemplateView(filters), RenderPosition.BEFOREEND);
filmPresenter.init(films);
const comm = generateComment();
console.log(comm);
render(siteFooterElement, new FooterStatisticView(), RenderPosition.BEFOREEND);
