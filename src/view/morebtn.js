import {createElement} from '../utils.js';

const createShowmoreBtn = () => (
  `<button class="films-list__show-more">
    Show more
  </button>`
);

class ShowmoreBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowmoreBtn();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default ShowmoreBtn;
