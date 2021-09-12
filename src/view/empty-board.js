import AbstractView from './abstract.js';

const createEmptyBoardTemplate = () => `
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database
      </h2>
    </section>
  </section>
`;

class EmptyBoardView extends AbstractView {

  getTemplate() {
    return createEmptyBoardTemplate();
  }
}

export default EmptyBoardView;
