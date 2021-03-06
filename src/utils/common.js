import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);

const getTotalRuntime = (totalMinutesAmount) => {
  const referenceDate = dayjs().startOf('day');
  const date = referenceDate.add(totalMinutesAmount, 'minute');
  const hoursAmount = date.diff(referenceDate, 'hour');
  const minutesAmount = date.subtract(hoursAmount, 'hour').diff(referenceDate, 'minute');
  return { hour: hoursAmount, minute: minutesAmount };
};

const getCurrentDate = () => dayjs().toDate();

const getCommentDate = (date) => dayjs(date).fromNow();

const isDateInPeriod = (date, period) => {
  period = period === 'today' ? 'day' : period;

  const limitDate = dayjs().subtract(1, period);
  return dayjs(date).isAfter(limitDate);
};

const isFilmInWatchingPeriod = (film, period) => {
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

const isEsc = ({ code }) => code === 'Escape';

const isEnter = ({ code }) => code === 'Enter';

const formatDate = (date, format) => dayjs(date).format(format);

const sortByDate = (filmA, filmB) => filmB.filmInfo.release.date - filmA.filmInfo.release.date;

const sortByRating = (filmA ,filmB) => filmB.filmInfo.rating - filmA.filmInfo.rating;

export {isEsc, isEnter, getCurrentDate, getCommentDate, getTotalRuntime, isFilmInWatchingPeriod, formatItems, sortByDate, sortByRating, getDurationFromMinutes, formatDate, getShortDescription};
