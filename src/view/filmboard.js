import AbstractView from './abstract.js';

const createFilmBoardTemplate = () => '<section class="films"></section>';

class FilmBoardTemplate extends AbstractView {
  getTemplate() {
    return createFilmBoardTemplate();
  }
}

export default FilmBoardTemplate;
