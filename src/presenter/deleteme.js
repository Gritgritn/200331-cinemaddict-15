import FilmCardView from '../view/card.js';
// import PopupTemplateView from '../view/popup.js';
import {render, RenderPosition} from '../utils/render.js';

class Film {
  constructor(filmCardContainer) {
    this._filmCardContainer = filmCardContainer;

    this._filmCardComponent = null;
    this._popupComponent = null;
    // this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    // this._escKeyDownHandler = this.__escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmCardComponent = new FilmCardView();
    // this._popupComponent = new PopupTemplateView();
    // this._filmCardComponent.setPosterClickHandler(this._openPopupClickHandler);
    // this._filmCardComponent.setFilmNameClickHandler(this._openPopupClickHandler);
    // this._filmCardComponent.setAllCommentsClickHandler(this._openPopupClickHandler);

    render(this._filmCardContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
  }



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











  console.log(new Film(siteMainElement, films[1]));











// console.log(new FilmCardView(film).getElement());
// const filmPresenter = new FilmPresenter(siteMainElement);
// console.log(filmPresenter);
// console.log(new FilmPresenter(siteMainElement));
// filmPresenter.init(films);











// movie.js

import FilmCardView from '../view/card.js';
// import PopupTemplateView from '../view/popup.js';
import {render, RenderPosition} from '../utils/render.js';

class Film {
  constructor(filmCardContainer, film) {
    this._filmCardContainer = filmCardContainer;
    this._film = film;

    this._filmCardComponent = new FilmCardView(film);
    render(this._filmCardContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    // this._popupComponent = null;
    // this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    // this._escKeyDownHandler = this.__escKeyDownHandler.bind(this);
  }


}
export default Film;

// main.js
console.log(new Film(siteMainElement, films[1]));













import FilmCardView from '../view/card.js';
// import PopupTemplateView from '../view/popup.js';
import {render, RenderPosition} from '../utils/render.js';

class Film {
  constructor(filmCardContainer, film) {
    this._filmCardContainer = filmCardContainer;
    this._film = film;


    render(this._filmCardContainer, new FilmCardView(film), RenderPosition.BEFOREEND);
    // this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    // this._escKeyDownHandler = this.__escKeyDownHandler.bind(this);
  }

}

export default Film;
