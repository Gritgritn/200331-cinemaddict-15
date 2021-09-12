import { getRank } from './utils/profile.js';
import { filter } from './utils/filters.js';
import RankModel from './model/rank.js';
import ProfilePresenter from './presenter/profile.js';
import FilmsModel from './model/movie.js';
import FilterModel from './model/filter.js';
import FooterStatisticPresenter from './presenter/footer-statistics.js';
import BoardPresenter from './presenter/board.js';
import FiltersPresenter from './presenter/filter.js';
import {moviesData} from './mock/newfilm';
import {Screen, FilterType} from './const';
import StatisticScreenPresenter from './presenter/statisctic-screen.js';

const films = moviesData;
const mockRank = getRank(filter[FilterType.HISTORY](films).length);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const rankModel = new RankModel(mockRank);
const filterModel = new FilterModel();

const profilePresenter = new ProfilePresenter(siteHeaderElement, rankModel, filmsModel);
const filtersPresenter = new FiltersPresenter(siteMainElement, filterModel, filmsModel, renderScreen);
const filmPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);
const footerStatisticPresenter = new FooterStatisticPresenter(siteFooterElement);

const statisticScreenPresenter = new StatisticScreenPresenter(siteMainElement, rankModel, filmsModel);

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
}

profilePresenter.init();
filtersPresenter.init();

renderScreen(Screen.FILMS);

footerStatisticPresenter.init(films.length);
