import AbstractView from './abstract.js';

const createShowmoreBtn = () => (
  `<button class="films-list__show-more">
    Show more
  </button>`
);

class ShowmoreBtn extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowmoreBtn();
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}

export default ShowmoreBtn;
