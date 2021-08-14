import {getRandomInteger} from '../utils/common.js';
import AbstractView from './abstract.js';

const generalMovieCount = getRandomInteger(110110, 150000);
const createFooterStatisticTemplate = () => (
  `<section class="footer__statistics">
  <p>${generalMovieCount} movies inside</p>
  </section>`
);

class FooterStatistic extends AbstractView {
  getTemplate() {
    return createFooterStatisticTemplate();
  }
}

export default FooterStatistic;
