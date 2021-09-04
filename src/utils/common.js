import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getDurationFromMinutes = (durationInMinutes) => {
  const lasting = dayjs.duration(durationInMinutes, 'minutes');
  return `${lasting.hours()}h ${lasting.minutes()}m`;
};

const getShortDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    description = `${description.substr(0, maxLength)}...`;
  }
  return description;
};

const formatDate = (date, format) => dayjs(date).format(format);

const relativeDate = (date) => dayjs(date).fromNow();

const updateItem = (items, update) => items.map((it) => it.id === update.id ? update : it);

const sortByDate = (filmA, filmB) => filmB.filmInfo.release.date - filmA.filmInfo.release.date;

const sortByRating = (filmA ,filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {getRandomInteger, updateItem, sortByDate, sortByRating, relativeDate, getDurationFromMinutes, formatDate, getShortDescription};
