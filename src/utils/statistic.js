const getGenresStatistic = (watchedFilms) => {
  const genresStatistic = new Map();
  watchedFilms.forEach( ({ filmInfo }) => {
    const { genre } = filmInfo;
      genre.forEach((genreItem) => {
        const count = genresStatistic.has(genreItem) ? genresStatistic.get(genreItem) : 1;
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

  return { genre, counts };
};

const getTopGenre = ({ genre }) => genre.length ? genre[0] : null;

const getTotalDuration = (totalMinutesDuration) => {
  const MINUTES_IN_HOUR = 60;

  const hour = Math.floor(totalMinutesDuration / 60);
  const minute = totalMinutesDuration - hour * MINUTES_IN_HOUR;

  return { hour, minute };
};

export const getWatchedStatisticData = (watchedFilms) => {
  const totalMinutesDuration = watchedFilms.reduce((duration, film) => duration += film.filmInfo.runtime, 0);
  const genresStatistic = getGenresStatistic(watchedFilms);

  return {
    totalAmount: watchedFilms.length,
    totalDuration: getTotalDuration(totalMinutesDuration),
    genresStatistic: genresStatistic,
    topGenre: getTopGenre(genresStatistic),
  };
};
