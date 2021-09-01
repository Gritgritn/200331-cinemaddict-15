import UserTitleView from './view/usertitle.js';
import FooterStatisticView from './view/footerstatistic.js';
// import {generateFilm} from './mock/film.js';
import FilmsModel from './model/movie.js';
import FilterModel from './model/filter.js';
import {render, RenderPosition} from './utils/render.js';
import BoardPresenter from './presenter/board.js';
import FiltersPresenter from './presenter/filter.js';
import {moviesData} from './mock/newfilm';


// const FILM_COUNT = 20;
// const films1 = new Array(FILM_COUNT).fill().map(generateFilm);
// console.log(films1);
console.log(moviesData);
const films = moviesData;
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filterModel = new FilterModel();
const filtersPresenter = new FiltersPresenter(siteMainElement, filterModel, filmsModel);
const filmPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);

render(siteHeaderElement, new UserTitleView(), RenderPosition.BEFOREEND);

filtersPresenter.init();
filmPresenter.init();

render(siteFooterElement, new FooterStatisticView(), RenderPosition.BEFOREEND);
