import {remove, render, RenderPosition } from '../utils/render.js';
import StatisticView from '../view/statistic.js';
import {filter} from '../utils/filters.js';
import {isFilmInWhatcingPeriod} from '../utils/common.js';
import { FilterType } from '../const.js';
import { getWatchedStatisticData } from '../utils/statistic.js';

class StatisticScreen {
  constructor(statisticContainer, rankModel, filmsModel) {
    this._statisticContainer = statisticContainer;
    this._rankModel = rankModel;
    this._filmsModel = filmsModel;

    this._handlePeriodChange = this._handlePeriodChange.bind(this);
  }

  init() {
    this._watchedFilms = filter[FilterType.HISTORY](this._filmsModel.getFilms());
    console.log('watchedFilms:', this._watchedFilms);
    this._statiscticView = new StatisticView();
    this._statiscticView.setPeriodChangeHandler(this._handlePeriodChange);
    this._statiscticView.updateData({
      rank: this._rankModel.getRank(),
      activePeriodValue: 'all-time',
      ...getWatchedStatisticData(this._watchedFilms),
    });
    render(this._statisticContainer, this._statiscticView, RenderPosition.BEFOREEND);
  }

  _handlePeriodChange(activePeriodValue) {
    const watchedFilms = [...this._watchedFilms].filter((film) => isFilmInWhatcingPeriod(film, activePeriodValue));
    console.log('watchedFilms:', watchedFilms);

    this._statiscticView.updateData({
      activePeriodValue,
      ...getWatchedStatisticData(watchedFilms),
    });
  }

  destroy() {
    if (this._statiscticView) {
      remove(this._statiscticView);
      this._statiscticView = null;
    }
  }
}

export default StatisticScreen;