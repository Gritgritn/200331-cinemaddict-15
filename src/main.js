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
import {Screen, FilterType, UpdateType} from './const';
import StatisticScreenPresenter from './presenter/statisctic-screen.js';
import Api from './api.js';
import CommentsModel from './model/comments.js';

const AUTHORIZATION = 'Basic hS2sfS24ccl1sa2j';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';

const filmsMock = moviesData;

const api = new Api(END_POINT, AUTHORIZATION);

const mockRank = getRank(filter[FilterType.HISTORY](filmsMock).length);

const filmsModel = new FilmsModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const rankModel = new RankModel(mockRank);
const filterModel = new FilterModel();
const commentsModel = new CommentsModel(api,filmsModel);

const profilePresenter = new ProfilePresenter(siteHeaderElement, rankModel, filmsModel);
const filtersPresenter = new FiltersPresenter(siteMainElement, filterModel, filmsModel, renderScreen);
const filmPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel, api, commentsModel);
const footerStatisticPresenter = new FooterStatisticPresenter(siteFooterElement);

const statisticScreenPresenter = new StatisticScreenPresenter(siteMainElement, rankModel, filmsModel);

let currentScreen = null;
function renderScreen (screen) {
  if (screen === currentScreen) {
    return;
  }

  currentScreen = screen;

  switch (screen) {
    case Screen.FILMS: {
      statisticScreenPresenter.destroy();
      filmPresenter.init();
      break;
    }
    case Screen.STATISTIC: {
      filmPresenter.destroy();
      statisticScreenPresenter.init();
      break;
    }
  }
}

profilePresenter.init();
filtersPresenter.init();

renderScreen(Screen.FILMS);
footerStatisticPresenter.init(filmsMock.length);

api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
})
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
