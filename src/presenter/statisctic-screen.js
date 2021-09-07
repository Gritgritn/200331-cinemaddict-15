import {remove, render, RenderPosition } from '../utils/render.js';
import StatisticView from '../view/statistic.js';

class StatisticScreen {
  constructor(statisticContainer) {
    this._statisticContainer = statisticContainer;
  }

  init() {
    this._statiscticView = new StatisticView();
    render(this._statisticContainer, this._statiscticView, RenderPosition.BEFOREEND);
  }

  destroy() {
    if (this._statiscticView) {
      remove(this._statiscticView);
      this._statiscticView = null;
    }
  }
}

export default StatisticScreen;
