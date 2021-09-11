import AbstractObserver from '../utils/abstract-observer.js';
import { createComment, deleteComment, getCommentsByIds } from '../mock/newfilm.js';


class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
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
}

export default Films;
