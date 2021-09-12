import {CommentAuthors, Comments, Emotions} from './dataset';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import {getRandomInteger} from '../utils/common.js';
import {Actors, Descriptions, FilmsDirectors, FilmsTitles, Genres, Posters, ReleaseCountries, Writers} from './dataset';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(relativeTime);
dayjs.extend(duration);

const comments = new Map();
const getRandomDate = () => dayjs().subtract(getRandomInteger(1, 40000), 'day');
const getRandomWatchingDate = () => dayjs().subtract(getRandomInteger(1, 500), 'day');
const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));
const getRandomDescription = (arrayOfStrings) => arrayOfStrings.slice(0, getRandomInteger(1, 5)).join(' ');
const getRandomFloat = (min, max, decimals) => {
  const startValue = Math.min(min, max);
  const endValue = Math.max(min, max);
  const randomInteger = startValue + Math.random() * (endValue - startValue);
  return +randomInteger.toFixed(decimals);
};
const getRandomItem = (arrayOfItems) => {
  const index = getRandomInteger(0, arrayOfItems.length - 1);
  return arrayOfItems[index];
};


const generateCommentDate = () => {
  const commentDayShift = getRandomInteger(0, 180);
  const commentMinuteShift = getRandomInteger(0, 700);
  return dayjs().subtract(commentDayShift, 'day').subtract(commentMinuteShift, 'minute').toDate();
};

const generateComment = () => {
  const comment = {
    id: nanoid(),
    text: getRandomItem(Comments),
    author: getRandomItem(CommentAuthors),
    emotion: getRandomItem(Emotions),
    date: generateCommentDate(),
  };

  comments.set(comment.id, comment);

  return comment;
};

const getCommentById = (id) => comments.get(id);

const getCommentsByIds = (ids) => ids.map((id) => getCommentById(id));

const createComment = ({ text, emotion }) => {
  if (!text || !emotion) {
    throw new Error('Comment invalid');
  }

  const newComment = {
    text,
    emotion,
    author: 'Me',
    id: nanoid(),
    date: new Date(),
  };

  comments.set(newComment.id, newComment);

  return newComment;
};

const deleteComment = (commentId) => {
  comments.delete(commentId);
};

const generateComments = () => {
  // с вероятностью 25% комментарии отсутствуют
  if (getRandomBoolean() && getRandomBoolean()) {
    return [];
  }

  const commentsAmount = getRandomInteger(1, 5);
  const comments = [];

  for (let i = 0; i < commentsAmount; i++) {
    const comment = generateComment();
    comments.push(comment.id);
  }

  return comments;
};

const getRandomItemFromArray = (items) => {
  const index = getRandomInteger(0, items.length - 1);
  return items[index];
};
const getUniqueItemsFromArray = (items, maxUniqueAmount, minUniqueAmount = 1) => {
  const uniqueAmount = getRandomInteger(minUniqueAmount, maxUniqueAmount);
  const itemsSet = new Set();
  while (itemsSet.size < uniqueAmount) {
    itemsSet.add(getRandomItemFromArray(items));
  }
  return Array.from(itemsSet);
};
const generateWriters = () => getUniqueItemsFromArray(Writers, 3);
const generateActors = () => getUniqueItemsFromArray(Actors, 4, 1);
const generateGenres = () => {
  const maxAmount = getRandomInteger(1, 3);
  return getUniqueItemsFromArray(Genres, maxAmount);
};

const MIN_RATING = 0;
const MAX_RATING = 10;
const RATING_DECIMALS = 1;
const MIN_AGE_RATING = 0;
const MAX_AGE_RATING = 100;
const MIN_RUN_TIME = 60;
const MAX_RUN_TIME = 240;

const NUMBER_OF_MOVIES = 15;

const getRandomFilmData = (numberOfMovies) => {
  const films = [];
  for (let i = 0; i < numberOfMovies; i++)  {
    films.push({
      id: i,
      comments: generateComments(),
      filmInfo: {
        title: getRandomItem(FilmsTitles),
        alternativeTitle: getRandomItem(FilmsTitles),
        totalRating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_DECIMALS),
        poster: getRandomItem(Posters),
        ageRating: getRandomInteger(MIN_AGE_RATING, MAX_AGE_RATING),
        director: getRandomItem(FilmsDirectors),
        writers: generateWriters(),
        actors: generateActors(),
        release: {
          date: getRandomDate(),
          releaseCountry: getRandomItem(ReleaseCountries),
        },
        runtime: getRandomInteger(MIN_RUN_TIME, MAX_RUN_TIME),
        genre: generateGenres(),
        description: getRandomDescription(Descriptions),
      },
      userDetails: {
        watchlist: getRandomBoolean(),
        alreadyWatched: getRandomBoolean(),
        watchingDate: getRandomWatchingDate(),
        favorite: getRandomBoolean(),
      },
    });
  }
  return films;
};

const moviesData = getRandomFilmData(NUMBER_OF_MOVIES);

export {moviesData, createComment, deleteComment, getCommentsByIds};
