import AbstractView from './abstract.js';

const createFooterStatisticTemplate = (filmsAmount) => (
  `<section class="footer__statistics">
  <p>${filmsAmount} movies inside</p>
  </section>`
);

class FooterStatistic extends AbstractView {
  constructor(filmsAmount = 0) {
    super();

    this._filmsAmount = filmsAmount;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._filmsAmount);
  }
}

export default FooterStatistic;
