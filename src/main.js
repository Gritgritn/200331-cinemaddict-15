import MenuTemplateView from './view/menu.js';
// import ShowmoreBtnView from './view/morebtn.js';
import UserTitleView from './view/usertitle.js';
import FooterStatisticView from './view/footerstatistic.js';
import {generateFilm} from './mock/film.js';
// import SortTemplateView from './view/sort.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';
// import FilmBoardTemplateView from './view/filmboard.js';
// import FilmListView from './view/filmlist.js';
// import FilmListContainerView from './view/flim-listcontainer.js';
import MostCommentedListView from './view/mostcommented.js';
import TopRatedView from './view/toprated.js';
// import PopupTemplateView from './view/popup.js';
// import FilmCardView from './view/card.js';
// import FilmPresenter from './presenter/movie.js';
// import NoFilmView from './view/no-film';
import BoardPresenter from './presenter/board.js';

const EXTRA_CARD_COUNT = 2;
const FILM_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const filmPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new UserTitleView(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuTemplateView(filters), RenderPosition.BEFOREEND);
filmPresenter.init(films);
render(siteFooterElement, new FooterStatisticView(), RenderPosition.BEFOREEND);
