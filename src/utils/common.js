const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const updateItem = (items, update) => {
  return items.map((it) => it.id === update.id ? update : it);
};

const sortByDate = (filmA, filmB) => {
  return filmB.premiereDate - filmA.premiereDate;
};

const sortByRating = (filmA ,filmB) => {
  return filmB.rating - filmA.rating;
};

export {getRandomInteger, updateItem, sortByDate, sortByRating};
