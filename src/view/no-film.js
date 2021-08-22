import Abstract from './abstract.js';

const createNoFilmLsTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>`
);

class NoFilms extends Abstract {
  getTemplate() {
    return createNoFilmLsTemplate();
  }
}

export default NoFilms;
