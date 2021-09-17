import AbstractObserver from '../utils/abstract-observer';

class Comments extends AbstractObserver {
  constructor(api, filmsModel) {
    super();
    this._comments = [];
    this._api = api;
    this._filmsModel = filmsModel;
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  static adaptCommentToClient(comment) {
    const clientComment = { ...comment };

    clientComment.text = comment.comment;
    clientComment.date = new Date(comment.date);
    delete clientComment.comment;


    return clientComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        emotion: comment.emotion,
      },
    );
    delete adaptedComment.emoji;
    return adaptedComment;
  }
}

export default Comments;
