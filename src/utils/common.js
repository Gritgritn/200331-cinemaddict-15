import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getTotalRuntime = (totalMinutesAmount) => {
  const referenceDate = dayjs().startOf('day');
  const date = referenceDate.add(totalMinutesAmount, 'minute');
  const hoursAmount = date.diff(referenceDate, 'hour');
  const minutesAmount = date.subtract(hoursAmount, 'hour').diff(referenceDate, 'minute');
  return { hour: hoursAmount, minute: minutesAmount };
};

const isDateInPeriod = (date, period) => {
  period = period === 'today' ? 'day' : period;

  const limitDate = dayjs().subtract(1, period);
  return dayjs(date).isAfter(limitDate);
};

const isFilmInWhatcingPeriod = (film, period) => {
  if (period === 'all-time') {
    return true;
  }

  const { watchingDate } = film.userDetails;

  return isDateInPeriod(watchingDate, period);
};

const formatItems = (items) => items.join(', ');

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

export {getTotalRuntime, isFilmInWhatcingPeriod, formatItems, getRandomInteger, updateItem, sortByDate, sortByRating, relativeDate, getDurationFromMinutes, formatDate, getShortDescription};
