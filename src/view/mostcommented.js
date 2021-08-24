import AbstractView from './abstract.js';

const createMostCommentedFilmList = () => `<section class="films-list films-list--extra films-list--commented">
<h2 class="films-list__title">Most commented</h2>
<div class="films-list__container"></div>
</section>`;

class MostCommentedList extends AbstractView {
  getTemplate() {
    return createMostCommentedFilmList();
  }
}

export default MostCommentedList;
