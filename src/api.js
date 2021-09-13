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
    .then((films) => films.map(FilmsModel.adaptFilmToClient))
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



  addComment(film) {
    return this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      // body: JSON.stringify(TasksModel.adaptToServer(task)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    // .then(Api.toJSON)
    // .then(TasksModel.adaptToClient);
  }

  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });
  }

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
