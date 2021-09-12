import AbstractObserver from '../utils/abstract-observer.js';
import { createComment, deleteComment, getCommentsByIds } from '../mock/newfilm.js';


class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilmComments(id) {
    const { comments } = this._films.find((film) => film.id === id);
    return getCommentsByIds(comments);
  }

  deleteComment(updateType, { film, commentId }) {
    deleteComment(commentId);

    const updatedFilm = {
      ...film,
      comments: film.comments.filter((id) => id !== commentId),
    };

    this.updateFilm(updateType, updatedFilm);
  }

  createComment(updateType, { film, newComment }) {
    const { id: commentId } = createComment(newComment);

    const updatedFilm = {
      ...film,
      comments: [...film.comments, commentId],
    };

    this.updateFilm(updateType, updatedFilm);
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  getFilms() {
    return this._films;
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
  };

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
  };
}

export default Films;
