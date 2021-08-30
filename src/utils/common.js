const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const updateItem = (items, update) => items.map((it) => it.id === update.id ? update : it);

const sortByDate = (filmA, filmB) => filmA.film.filmInfo.releaseFilm.date - filmB.film.filmInfo.releaseFilm.date;

const sortByRating = (filmA ,filmB) => filmB.film.filmInfo.totalRating - filmA.film.filmInfo.totalRating;

const getRandomArray = (minLength, maxLength, array) => {
  const randomArray = new Array(getRandomInteger (minLength, maxLength)).fill(null).map(() => array[getRandomInteger (0, array.length -1)]);
  return Array.from(new Set(randomArray));
};

export {getRandomInteger, updateItem, sortByDate, sortByRating, getRandomArray};
