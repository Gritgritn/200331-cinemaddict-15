import {getRandomInteger} from '../utils.js';
import {createElement} from '../utils.js';

const generalMovieCount = getRandomInteger(110110, 150000);

const createFooterStatisticTemplate = () => (
  `<section class="footer__statistics">
  <p>${generalMovieCount} movies inside</p>
  </section>`
);

class FooterStatistic {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate();
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

export default FooterStatistic;
