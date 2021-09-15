import FilmsModel from './model/movie.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: 'movies'})
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptFilmToClient));
  }

  getComments(film) {
    return this._load({
      url: `comments/${film.id}`,
      method: Method.GET,
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then((comments) => comments.map(FilmsModel.adaptCommentToClient));
  }

  async deleteComment(id) {
    await this._load({
      url: `comments/${id}`,
      method: Method.DELETE,
    });
  }

  async addComment(film, newComment) {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(FilmsModel.adaptNewCommentToServer(newComment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const { movie, comments  } = await Api.toJSON(response);
    const adaptedResponse = {
      updatedFilm: FilmsModel.adaptFilmToClient(movie),
      updatedComments: comments.map(FilmsModel.adaptCommentToClient),
    };
    // const updatedFilm = FilmsModel.adaptFilmToClient(movie);

    return adaptedResponse;
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptFilmToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptFilmToClient);
  }

  removeComment(comment) {
    return this._load({
      url: `comments/${comment}`,
      method: Method.DELETE,
    });
  }

  // addComment(movie, comment) {
  //   return this._load({
  //     url: `comments/${movie.id}`,
  //     method: Method.PUT,
  //     body: JSON.stringify(CommentsModel.adaptToServer(comment)),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   })
  //     .then(Api.toJSON)
  //     .then((data) => ({
  //       film: MoviesModel.adaptToClient(data.movie),
  //       comments: data.comments.map(CommentsModel.adaptToClient),
  //     }));
  // }

  // deleteComment(commentId) {
  //   return this._load({
  //     url: `comments/${commentId}`,
  //     method: Method.PUT,
  //   });
  // }

  // addComment(film) {
  //   return this._load({
  //     url: `comments/${film.id}`,
  //     method: Method.POST,
  //     // body: JSON.stringify(TasksModel.adaptToServer(task)),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   });
  //   // .then(Api.toJSON)
  //   // .then(TasksModel.adaptToClient);
  // }

  // deleteComment(comment) {
  //   return this._load({
  //     url: `comments/${comment.id}`,
  //     method: Method.DELETE,
  //   });
  // }

  async _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);
    const response = await fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    );

    return Api.checkStatus(response);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
