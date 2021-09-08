import {remove, render, RenderPosition } from '../utils/render.js';
import StatisticView from '../view/statistic.js';
import { filter } from '../utils/filters.js';
import { FilterType } from '../const.js';
import { getWatchedStatisticData } from '../utils/statistic.js';

class StatisticScreen {
  constructor(statisticContainer, rankModel, filmsModel) {
    this._statisticContainer = statisticContainer;
    this._rankModel = rankModel;
    this._filmsModel = filmsModel;
  }

  init() {
    const watchedFilms = filter[FilterType.HISTORY](this._filmsModel.getFilms());
    this._statiscticView = new StatisticView();
    this._statiscticView.updateData({
      rank: this._rankModel.getRank(),
      ...getWatchedStatisticData(watchedFilms),
    });
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
