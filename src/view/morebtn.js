import AbstractView from './abstract.js';

const createShowmoreBtn = () => (
  `<button class="films-list__show-more">
    Show more
  </button>`
);

class ShowmoreBtn extends AbstractView {
  getTemplate() {
    return createShowmoreBtn();
  }
}

export default ShowmoreBtn;
