import {remove, render, RenderPosition } from '../utils/render.js';
import StatisticView from '../view/statistic.js';
import { filter } from '../utils/filters.js';
import { FilterType } from '../const.js';

class StatisticScreen {
  constructor(statisticContainer, rankModel, filmsModel) {
    this._statisticContainer = statisticContainer;
    this._rankModel = rankModel;
    this._filmsModel = filmsModel;
  }

  init() {
    const watchedFilms = filter[FilterType.HISTORY](this._filmsModel.getFilms());
    const watchedFilmsDuration = watchedFilms.reduce((duration, film) => duration += film.filmInfo.runtime, 0);

    let genresStatistic = new Map();
    watchedFilms.forEach( ({ filmInfo }) => {
      const { genre } = filmInfo;
      genre.forEach((genreItem) => {
        const count = genresStatistic.has(genreItem) ? genresStatistic.get(genreItem) : 1;
        genresStatistic.set(genreItem, count + 1);
      });
    });

    genresStatistic = Array.from(genresStatistic.entries()).sort((a, b) => b[1] - a[1]);

    this._statiscticView = new StatisticView({
      rank: this._rankModel.getRank(),
      watchedFilmsAmount: watchedFilms.length,
      watchedFilmsDuration,
      genresStatistic,
      topGenre: genresStatistic[0][0],
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
