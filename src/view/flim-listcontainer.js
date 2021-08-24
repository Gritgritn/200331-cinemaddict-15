import AbstractView from './abstract.js';

const createFilmListContainer = () => '<div class="films-list__container"></div>';

class FilmListContainer extends AbstractView {
  getTemplate() {
    return createFilmListContainer();
  }
}

export default FilmListContainer;
