import {EmotionsImages} from '../mock/dataset';
import SmartView from './smart.js';
import {relativeDate} from '../utils/common.js';


const getCommentItemHtml = (commentDataItem) => {
  const {author, comment, date, emotion} = commentDataItem;
  const commentDate = relativeDate(date);

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${EmotionsImages[emotion]}" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `;
};

class CommentItem extends SmartView {
  constructor(commentDataItem) {
    super();
    this._commentdataItem = commentDataItem;
    this._commentDeleteCallback = this._commentDeleteCallback.bind(this);
  }

  getTemplate() {
    return getCommentItemHtml(this._commentdataItem);
  }

  _commentDeleteCallback(evt) {
    evt.preventDefault();
    this._callback.commentDelete(this._commentdataItem.id);
  }

  setCommentDeleteCallback(callback) {
    this._callback.commentDelete = callback;
    this
      .getElement()
      .querySelector('.film-details__comment-delete')
      .addEventListener('click', this._commentDeleteCallback);
  }
}

export default CommentItem;
