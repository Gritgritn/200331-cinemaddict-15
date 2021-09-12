import AbstractView from '../abstract.js';

const createFilmDetailsBottomTemplate = () => '<div class="film-details__bottom-container"></div>';

class FilmDetailsBottomView extends AbstractView {
  getTemplate() {
    return createFilmDetailsBottomTemplate();
  }
}

export default FilmDetailsBottomView;
