import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const relativeDate = (date) => dayjs(date).fromNow();

const updateItem = (items, update) => items.map((it) => it.id === update.id ? update : it);

const sortByDate = (filmA, filmB) => filmB.filmInfo.release.date - filmA.filmInfo.release.date;

const sortByRating = (filmA ,filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {getRandomInteger, updateItem, sortByDate, sortByRating, relativeDate};
