import UserTitleView from './view/usertitle.js';
import FooterStatisticView from './view/footerstatistic.js';
import FilmsModel from './model/movie.js';
import FilterModel from './model/filter.js';
import {render, RenderPosition} from './utils/render.js';
import BoardPresenter from './presenter/board.js';
import FiltersPresenter from './presenter/filter.js';
import {moviesData} from './mock/newfilm';
import {Screen} from './const';
import StatisticScreenPresenter from './presenter/statisctic-screen.js';

const films = moviesData;
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filterModel = new FilterModel();
const filtersPresenter = new FiltersPresenter(siteMainElement, filterModel, filmsModel, renderScreen);
const filmPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);

const statisticScreenPresenter = new StatisticScreenPresenter(siteMainElement);

let currentScreen = null;
function renderScreen (screen) {
  if (screen === currentScreen) {
    return;
  }

  currentScreen = screen;

  switch (screen) {
    case Screen.FILMS:
      statisticScreenPresenter.destroy();
      filmPresenter.init();
      break;

    case Screen.STATISTIC:
      filmPresenter.destroy();
      statisticScreenPresenter.init();
      break;
  }
};

render(siteHeaderElement, new UserTitleView(), RenderPosition.BEFOREEND);

filtersPresenter.init();

renderScreen(Screen.FILMS);

render(siteFooterElement, new FooterStatisticView(), RenderPosition.BEFOREEND);
