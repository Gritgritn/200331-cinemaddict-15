import dayjs from 'dayjs';
import {getRandomInteger, getRandomArray} from '../utils/common.js';
import {EMOTIONS} from '../const.js';
import {nanoid} from 'nanoid';
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const generateData = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};
const ALTERNATIVE_TITLES = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'The Great Flamarion',
  'Made for Each Other',
];
const COUNTRIES = [
  ' Afghanistan',
  ' Albania',
  ' Algeria',
  ' Andorra',
  ' Angola',
  ' Argentina',
  ' Armenia',
  ' Azerbaijan',
  ' Bangladesh',
  ' Barbados',
];
const WRITERS = [
  ' Billy Wilder',
  ' Robert Towne',
  ' Quentin Tarantino',
  ' Charlie Kaufman',
  ' Woody Allen',
  ' Steven Spielberg',
  ' David Fincher',
  ' James Cameron',
  ' Martin Scorsese',
  ' Christopher Nolan',
];
const ACTORS = [
  ' Alan Rickman',
  ' Benedict Cumberbatch',
  ' Benicio del Toro',
  ' Vincent Cassel',
  ' Viggo Mortensen',
  ' James McAvoy',
  ' Jake Gyllenhaal',
  ' Daniel Day-Lewis',
  ' Daniel Radcliffe',
  ' Casey Affleck',
];
const GENRES = [
  ' Musical',
  ' Western',
  ' Drama',
  ' Comedy',
  ' Cartoon',
  ' Mystery',
];
const AUTHORS_COMMENT = [
  ' Ванька',
  ' Петька',
  ' Илюха',
  ' Нагибатор666',
  ' Оленька',
  ' Алена',
  ' Злая девочка',
  ' Просто придурок',
  ' Альфонс',
  ' Задрот',
];
// const generateDate = () => {
//   const maxDaysGap = 14965;
//   const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

//   return dayjs('1980-01-01').add(daysGap, 'day').toDate();
// };
const generateDate = () => {
  const randYear = getRandomInteger(1920, 2020);
  const randMonth = getRandomInteger(1, 12);
  const randDay = getRandomInteger(1, 30);

  return `${randYear}-${randMonth}-${randDay}`;
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
  const commentator = ['Eshli', 'Олег', 'Василий', 'Александр'];
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

const generateMovieComment = () => ({
  author: getCommentAuthor(),
  commentText: getRandomComment(),
  commentDate: getCommentDate(),
  emotion: getRandomEmotion(),
});

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
  const directors = ['Tom Ford', 'Teem Kook', 'Ansofa Genry', 'El Diablo'];
  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};
const getRandomWriter = () => {
  const writers = ['Takeshi Kitano', 'Meela Yovovich', 'Henry Genry', 'Eebo Dahtarlo'];
  const randomIndex = getRandomInteger(0, writers.length - 1);

  return writers[randomIndex];
};
const getRandomActor = () => {
  const actors = ['Morgan Freeman', 'Robert De Niro', 'Jack Nicholson', 'Denzel Washington', 'Tom Hanks'];
  const randomIndex = getRandomInteger(0, actors.length - 1);

  return actors[randomIndex];
};
const getRandomGenre = () => {
  const genres = ['Comedy', 'Thriller', 'Action', 'Fantasy', 'Adventure'];
  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

// const generateFilm = () => ({
//   id: nanoid(),
//   moviename: generateMovieName(),
//   poster: generatePoster(),
//   description: generateDescription(),
//   premiereDate: generateDate(),
//   rating: getRandomInteger(1, 10),
//   pegi: getRandomInteger(1, 18),
//   director: getRandomDirector(),
//   writers: getRandomWriter(),
//   actors: getRandomActor(),
//   runtime: getRandomInteger(60, 120),
//   genre: getRandomGenre(),
//   isInWatchlist: Boolean(getRandomInteger(0, 1)),
//   isWatched: Boolean(getRandomInteger(0, 1)),
//   isFavorite: Boolean(getRandomInteger(0, 1)),
//   comments: {
//     id: getRandomInteger(0, 10000),
//     author: getCommentAuthor(),
//     commentTexts: getRandomComment(),
//     commentDate: getCommentDate(),
//     emotion: getRandomEmotion(),
//   },
// });
let index = 0;
const generateUserDetails = () => ({
  watchlist: Boolean(getRandomInteger(0, 1)),
  already_watched: Boolean(getRandomInteger(0, 1)),
  watching_date: generateDate(),
  favorite: Boolean(getRandomInteger(0, 1)),
});
const generateReleaseFilm = () => {
  const randomDate = dayjs(generateDate());
  return {
    date: dayjs(randomDate).format('DD MMMM YYYY'),
    releaseCountry: generateData(COUNTRIES),
  };
};
const generateFIlmInfo = () => {
  const releaseFilm = generateReleaseFilm();

  return {
    title: generateMovieName(),
    alternativeTitle: generateData(ALTERNATIVE_TITLES),
    totalRating: getRandomInteger(1, 10),
    poster: generatePoster(),
    ageRating: getRandomInteger(1, 18),
    director: getRandomDirector(),
    writers: getRandomArray(1, 3, WRITERS),
    actors: getRandomArray(1, 3, ACTORS),
    releaseFilm,
    runtime: getRandomInteger(60, 120),
    genre: getRandomArray(1, 2, GENRES),
    description: generateDescription(),
  };
};
const generateFilm = (commentsId) => {
  const filmInfo = generateFIlmInfo();
  const userDetails = generateUserDetails();
  index += 1;

  return {
    id: index,
    comments: commentsId,
    filmInfo,
    userDetails,
  };
};
export const generateComment = () => {
  const maxGap = 3;
  const gap = getRandomInteger(0, maxGap);

  return {
    id: getRandomInteger(0, 10000),
    author: generateData(AUTHORS_COMMENT),
    comment: getRandomComment(),
    date: dayjs()
      .subtract(gap, 'minute')
      .subtract(gap, 'hour')
      .subtract(gap, 'day')
      .format('YYYY/MM/DD HH:mm'),
    emotion: getRandomEmotion(),
  };
};

export const generateCardFilmTemplate = () => {
  const comments = new Array(getRandomInteger(1, 6)).fill(null).map(generateComment);
  const commentsId = comments.map((item) => item.id);
  const film = generateFilm(commentsId);
  return {film, comments};
};


// // const generateComment = () => {
// //   const maxGap = 3;
// //   const gap = getRandomInteger(0, maxGap);

// //   return {
// //     id: getRandomInteger(0, 10),
// //     author: generateData(AUTHORS_COMMENT),
// //     comment: generateData(DESCRIPTIONS),
// //     date: dayjs()
// //       .subtract(gap, 'minute')
// //       .subtract(gap, 'hour')
// //       .subtract(gap, 'day')
// //       .format('YYYY/MM/DD HH:mm'),
// //     emotion: generateData(EMOTIONS),
// //   };
// // };

// const AUTHORS_COMMENT = [
//   ' Ванька',
//   ' Петька',
//   ' Илюха',
//   ' Нагибатор666',
//   ' Оленька',
//   ' Алена',
//   ' Злая девочка',
//   ' Просто придурок',
//   ' Альфонс',
//   ' Задрот',
// ];

// const DESCRIPTIONS = [
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   'Cras aliquet varius magna, non porta ligula feugiat eget.',
//   'Fusce tristique felis at fermentum pharetra.',
//   'Aliquam id orci ut lectus varius viverra.',
//   'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
//   'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
//   'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
//   'Sed sed nisi sed augue convallis suscipit in sed felis.',
//   'Aliquam erat volutpat.',
//   'Nunc fermentum tortor ac porta dapibus.',
//   'In rutrum ac purus sit amet tempus.',
// ];

// export {generateComment};
// export {generateFilm};
// export {generateMovieComment};
