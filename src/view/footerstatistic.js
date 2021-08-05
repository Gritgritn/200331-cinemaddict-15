import {getRandomInteger} from '../utils.js';

let generalMovieCount = getRandomInteger(110110, 150000);

const createFooterStatisticTemplate = () => (
  `<section class="footer__statistics">
  <p>${generalMovieCount} movies inside</p>
  </section>`
);

export {createFooterStatisticTemplate};
