import { getTotalRuntime } from './common.js';

const getGenresStatistic = (watchedFilms) => {
  const genresStatistic = new Map();
  watchedFilms.forEach( ({ filmInfo }) => {
    filmInfo.genre.forEach((genreItem) => {
        const count = genresStatistic.has(genreItem) ? genresStatistic.get(genreItem) : 0;
        genresStatistic.set(genreItem, count + 1);
      });
  });

  const genre = [];
  const counts = [];

  Array.from(genresStatistic.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([genreItem, count]) => {
      genre.push(genreItem);
      counts.push(count);
    });

    return genre.length ? { genre, counts } : null;
};

const getTopGenre = ({ genre }) => genre.length ? genre[0] : null;

const getWatchedStatisticData = (watchedFilms) => {
  const totalMinutesDuration = watchedFilms.reduce((duration, film) => duration += film.filmInfo.runtime, 0);
  const genresStatistic = getGenresStatistic(watchedFilms);

  return {
    totalAmount: watchedFilms.length,
    totalDuration: getTotalRuntime(totalMinutesDuration),
    genresStatistic: genresStatistic,
    topGenre: genresStatistic && getTopGenre(genresStatistic),
  };
};

const isFilmInWatchedPeriod = (film, period) => {

};

export {getWatchedStatisticData, isFilmInWatchedPeriod};
