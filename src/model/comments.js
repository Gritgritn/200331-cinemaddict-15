import AbstractObserver from '../utils/abstract-observer';

export default class Comments extends AbstractObserver {
  constructor(api, filmsModel) {
    super();
    this._comments = [];
    this._api = api;
    this._filmsModel = filmsModel;
  }

  fetchComments(film) {
    return this._api.getComments(film).then((comments) => {
      this._comments = comments;
    });
  }

  setComments(comments) {
    this._comments = comments.slice();
    console.log(this._comments);
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update, comment) {
    this._comments = [comment, ...this._comments];
    this._notify(updateType, update);
  }

  deleteComment(updateType, commentId) {
    this._comments = this._comments.filter(
      (comment) => comment.id !== commentId,
    );
    this._notify(updateType);
  }

  static adaptCommentToClient(comment) {
    const clientComment = { ...comment };

    clientComment.text = comment.comment;
    clientComment.date = new Date(comment.date);
    delete clientComment.comment;


    return clientComment;
  }

  // static adaptToClient(comment) {
  //   const adaptedComment = Object.assign(
  //     {},
  //     comment,
  //     {
  //       emotion: comment.emotion,
  //     },
  //   );

  //   return adaptedComment;
  // }

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
