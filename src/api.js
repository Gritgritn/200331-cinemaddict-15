import FilmsModel from './model/movie.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

class Api {
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

  deleteComment(id) {
    this._load({
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

    return adaptedResponse;
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
      !response.ok
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

export default Api;
