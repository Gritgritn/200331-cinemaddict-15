import dayjs from 'dayjs';
import {getRandomInteger} from '../utils.js';
import {EMOTIONS} from '../const.js';
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random



const generateDate = () => {
  const maxDaysGap = 14965;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs('1980-01-01').add(daysGap, 'day').toDate();
};

const getRandomComment = () => {
    const moviecomment = [
        'This year’s nominees are as accessible as they have ever been',
        'Nolan’s films manipulate truth as much as time, as another force relative to human perception',
        'All this is something I think I knew, instinctively, as a teenage viewer',
        'It felt like something that I was meant to write',
        'I was watching a different movie, one that spoke to me as an immigrant',
        'That night I went back to the condo and wrote a mountain of thoughts',
        'This was a much different piece from',
        'Oscar race, pieces on animation, interviews with internationally',
    ];
    const randomIndex = getRandomInteger(0, moviecomment.length - 1);
    return moviecomment[randomIndex];
};

const getCommentAuthor = () => {
    const commentator = ['Eshli', 'Олег', 'Василий', 'Александр']
    const randomIndex = getRandomInteger(0, commentator.length - 1);

    return commentator[randomIndex];
};
const getCommentDate = () => {
    const maxDaysGap = 600;
    const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

    return dayjs('2019-06-06').add(daysGap, 'day').toDate();
};
const getRandomEmotion = () => {
    const randomIndex = getRandomInteger(0, EMOTIONS.length - 1);
    return EMOTIONS[randomIndex];
};

const generateMovieComment = () => {
    return {
    author: getCommentAuthor(),
    comment: getRandomComment(),
    date: getCommentDate(),
    emotion: getRandomEmotion(),
    };
};

const generateMovieName = () => {
    const movienames = [
    'Легенда',
    'Аватар',
    'Интерстеллар',
    'Цикада 3301',
    'Никто',
    'Проект X',
    'Джентельмены',
    'Однажды в Голливуде',
];
const randomIndex = getRandomInteger(0, movienames.length - 1);
return movienames[randomIndex];
};

const generatePoster = () => {
    const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
    'santa-claus-conquers-the-martians.jpg',
];
const randomIndex = getRandomInteger(0, posters.length - 1);
return posters[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.  ',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    return descriptions[randomIndex];
};
const getRandomDirector = () => {
    const directors = ['Tom Ford', 'Teem Kook', 'Ansofa Genry', 'El Diablo']
    const randomIndex = getRandomInteger(0, directors.length - 1);

    return directors[randomIndex];
};
const getRandomWriter = () => {
    const writers = ['Takeshi Kitano', 'Meela Yovovich', 'Henry Genry', 'Eebo Dahtarlo']
    const randomIndex = getRandomInteger(0, writers.length - 1);

    return writers[randomIndex];
};
const getRandomActor = () => {
    const actors = ['Morgan Freeman', 'Robert De Niro', 'Jack Nicholson', 'Denzel Washington', 'Tom Hanks']
    const randomIndex = getRandomInteger(0, actors.length - 1);

    return actors[randomIndex];
};
const getRandomGenre = () => {
    const genres = ['Comedy', 'Thriller', 'Action', 'Fantasy', 'Adventure']
    const randomIndex = getRandomInteger(0, genres.length - 1);

    return genres[randomIndex];
};

const generateFilm = () => {
    return {
    moviename: generateMovieName(),
    poster: generatePoster(),
    description: generateDescription(),
    premiereDate: generateDate(),
    rating: getRandomInteger(1, 10),
    pegi: getRandomInteger(1, 18) + '+',
    director: getRandomDirector(),
    writers: getRandomWriter(),
    actors: getRandomActor(),
    runtime: getRandomInteger(60, 120),
    genre: getRandomGenre(),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    };
};

export {generateFilm};
export {generateMovieComment};