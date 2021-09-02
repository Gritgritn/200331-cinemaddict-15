import SmartView from './smart';
import {EmotionsImages} from '../mock/dataset';
import {isCtrlEnterEvent} from '../utils/render.js';
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime.js';
// dayjs.extend(relativeTime);

const getPopupNewCommentHtml = () => {
  return `
    <form class="film-details__new-comment" action="#">
       <div class="film-details__add-emoji-label">

       </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-emotion="smile">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-emotion="sleeping">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-emotion="puke">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-emotion="angry">
          </label>
        </div>
    </form>
  `;
};

export default class PopupNewCommentForm extends SmartView {
  constructor() {
    super();
    // this._textCommentInputHandler = this._textCommentInputHandler.bind(this);
    // this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
  }

  getTemplate() {
    return getPopupNewCommentHtml();
  }

  _createCommentHandler(evt) {
  if(isCtrlEnterEvent(evt)){
    this._film.comments.push(this._createComment());
    evt.preventDefault();
    this.updateElement(true);
  }
}
_createComment() {
  const comment = {
    id: 0,
    author: 'You',
    emotion: 'smile',
    comment: '',
    date: '',
  };
  comment.emotion = this._containerEmodji.firstElementChild.id;
  comment.comment = this._textComment;
  comment.date = dayjs();
  return comment;
}










// constructor() {
//   super();
//   // this.resetData();
//   this._emotionToggleHandler = this._emotionToggleHandler.bind(this);
//   this._textAreaInputHandler = this._textAreaInputHandler.bind(this);

//   this._setInnerHandlers();
// }
  // getTemplate() {
  //   return getPopupNewCommentHtml(this._state);
  // }

//   _setInnerHandlers() {
//     this.getElement()
//       .querySelector('.film-details__emoji-list')
//       .addEventListener('click', this._emotionToggleHandler);
//     this.getElement()
//       .querySelector('.film-details__comment-input')
//       .addEventListener('input', this._textAreaInputHandler);
//   }

//   restoreHandlers() {
//     this._setInnerHandlers();
//   }

//   _emotionToggleHandler(evt) {
//     if (evt.target.dataset.emotion) {
//       this.updateData({
//         emotion: evt.target.dataset.emotion,
//       });
//       this.updateElement();
//     }
//   }

//   _textAreaInputHandler(evt) {
//     this.updateData({
//       comment: evt.target.value,
//     }); // если будет обновляться при вводе, ввести второй параметр
//   }
}
