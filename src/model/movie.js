import AbstractObserver from '../utils/abstract-observer.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  setComments(updateType, comments) {
    this._comments = comments.slice();
    this._notify(updateType);
  }

  static adaptCommentToClient(comment) {
    const clientComment = { };
    clientComment.id = comment.id;
    clientComment.author = comment.author;
    clientComment.text = comment.comment;
    clientComment.date = new Date(comment.date);
    clientComment.emotion = comment.emotion;
    return clientComment;
  }

  static adaptNewCommentToServer(comment) {
    const serverComment = {  };
    serverComment.id = comment.id;
    serverComment.author = comment.author;
    serverComment.date = new Date(comment.date);
    serverComment.emotion = comment.emotion;
    serverComment.comment = comment.text;
    return serverComment;
  }

  static adaptFilmToClient(film) {
    const clientFilm = { ... film};

    clientFilm.filmInfo = {
      ...film['film_info'],
      alternativeTitle: film['film_info']['alternative_title'],
      ageRating: film['film_info']['age_rating'],
      rating: film['film_info']['total_rating'],
      poster: film['film_info'].poster,
      release: {
        date: new Date(film['film_info']['release']['date']),
        releaseCountry: film['film_info']['release']['release_country'],
      },
    };

    clientFilm.userDetails = {
      watchlist: film['user_details']['watchlist'],
      favorite: film['user_details']['favorite'],
      alreadyWatched: film['user_details']['already_watched'],
      watchingDate: film['user_details']['watching_date'] ? new Date(film['user_details']['watching_date']) : null,
    };

    delete clientFilm['film_info'];
    delete clientFilm.filmInfo['alternative_title'];
    delete clientFilm.filmInfo['age_rating'];
    delete clientFilm.filmInfo['total_rating'];

    delete clientFilm['user_details'];
    return clientFilm;
  }

  static adaptFilmToServer(film) {
    const serverFilm = { ... film};

    serverFilm['film_info'] = {
      ...film.filmInfo,
      ['alternative_title']: film.filmInfo.alternativeTitle,
      ['age_rating']: film.filmInfo.ageRating,
      ['total_rating']: film.filmInfo.rating,
      poster: film.filmInfo.poster,
    };

    serverFilm['film_info']['release'] = {
      ['date']: film.filmInfo.release.date ? film.filmInfo.release.date.toISOString() : null,
      ['release_country']: film.filmInfo.release.releaseCountry,
    };

    serverFilm['user_details'] = {
      ['watchlist']: film.userDetails.watchlist,
      ['favorite']: film.userDetails.favorite,
      ['already_watched']: film.userDetails.alreadyWatched,
      ['watching_date']: film.userDetails.watchingDate ? film.userDetails.watchingDate.toISOString() : null,
    };
    delete serverFilm.filmInfo;
    delete serverFilm['film_info'].alternativeTitle;
    delete serverFilm['film_info'].releaseCountry;
    delete serverFilm['film_info'].releaseDate;
    delete serverFilm['film_info'].ageRating;
    delete serverFilm['film_info'].rating;
    delete serverFilm.userDetails;
    return serverFilm;
  }
}

export default Films;
