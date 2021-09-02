import SmartView from './smart';
import {EmotionsImages} from '../mock/dataset';
import {isCtrlEnterEvent} from '../utils/render.js';
import dayjs from 'dayjs';


const getPopupNewCommentHtml = () => {
  return `
    <div class="film-details__new-comment" action="#">
       <div class="film-details__add-emoji-label">

       </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" id="smile" width="30" height="30" alt="emoji" data-emotion="smile">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" id="sleeping" width="30" height="30" alt="emoji" data-emotion="sleeping">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" id="puke" width="30" height="30" alt="emoji" data-emotion="puke">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" id="angry" width="30" height="30" alt="emoji" data-emotion="angry">
          </label>
        </div>
    </form>
  `;
};

export default class PopupNewCommentForm extends SmartView {
  constructor(film) {
    super();
    this._film= film;
    this._emojiListHandler = this._emojiListHandler.bind(this);
    this._textCommentInputHandler = this._textCommentInputHandler.bind(this);
    this._createCommentHandler = this._createCommentHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this.restoreHandlers();
  }

  restoreHandlers(){
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textCommentInputHandler);
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('click', this._emojiListHandler);
    this.getElement().addEventListener('keydown', this._createCommentHandler);
    this._buttonDelete = this.getElement().querySelectorAll('.film-details__comment-delete');
    this._buttonDelete.forEach((item) => item.addEventListener('click', this._deleteCommentClickHandler));
  }

  reset() {
    if(this._containerEmodji){
      this._containerEmodji.innerHTML = ' ';
    }
    if(this._textComment){
      this._textComment = ' ';
    }
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

  _emojiListHandler(evt) {
    evt.preventDefault();
    if (evt.target.alt !== 'emoji') {
      return;
    }
    if(this._containerEmodji){
      this._containerEmodji.innerHTML = ' ';
    }
    this._containerEmodji = this.getElement().querySelector('.film-details__add-emoji-label');
    const emodjiElement = evt.target.cloneNode();
    emodjiElement.style.height = '55px';
    emodjiElement.style.width = '55px';
    this._containerEmodji.appendChild(emodjiElement);

    return emodjiElement.className;
  }

  _textCommentInputHandler(evt){
    evt.preventDefault();
    this._textComment = evt.target.value;
  }

  reset() {
    if(this._containerEmodji){
      this._containerEmodji.innerHTML = ' ';
    }
    if(this._textComment){
      this._textComment = ' ';
    }
  }

  _deleteCommentClickHandler(evt){
    evt.preventDefault();
    this._film.comments.forEach((item, index) => {
      if(evt.target.parentElement.parentElement.textContent.includes(item.comment) && evt.target.parentElement.textContent.includes(item.author)){
        this._film.comments.splice(index, 1);
      }
      // evt.target.parentElement.parentElement.parentElement.remove();
    });

    this.updateElement(true);
  }
}
