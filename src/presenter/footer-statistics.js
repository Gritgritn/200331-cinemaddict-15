import { render, replace, RenderPosition } from '../utils/render.js';
import FooterStatisticView from '../view/footerstatistic.js';

class FooterStatisticsPresenter {
  constructor(footerStatisticsContainer) {
    this._footerStatisticsContainer = footerStatisticsContainer;
  }

  init(filmsAmount) {
    const prevFooterStatisticsView = this._footerStatisticsView;

    this._filmsAmount = filmsAmount;

    this._footerStatisticsView = new FooterStatisticView(this._filmsAmount);

    if (prevFooterStatisticsView) {
      replace(this._footerStatisticsView, prevFooterStatisticsView);
    } else {
      render(this._footerStatisticsContainer, this._footerStatisticsView, RenderPosition.BEFOREEND);
    }
  }
}

export default FooterStatisticsPresenter;
