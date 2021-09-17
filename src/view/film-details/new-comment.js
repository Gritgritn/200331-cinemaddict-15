import {EMOTIONS, NEW_COMMENT_DEFAULT} from '../../const.js';
import SmartView from '../smart.js';

const createEmotionInputTemplate = (emotion, isChecked) => {
  const checked = isChecked ? 'checked' : '';
  return `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${checked}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>
  `;
};

const createNewCommentTemplate = ({ text, emotion: currentEmotion }) => {
  const emotionInputsTemplate = Object.values(EMOTIONS).map((emotion) => createEmotionInputTemplate(emotion, emotion === currentEmotion)).join('');
  const emojiLabelTemplate = currentEmotion ?
    `<img src="images/emoji/${currentEmotion}.png" width="55" height="55" alt="emoji-smile" />` : '';

  return `
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
        ${emojiLabelTemplate}
      </div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emotionInputsTemplate}
      </div>
    </div>
  `;
};

class NewCommentView extends SmartView {
  constructor(newCommentData = NEW_COMMENT_DEFAULT) {
    super();

    this._data = {
      ...newCommentData,
    };

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emotionClickHandler = this._emotionClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  reset() {
    this.updateData(NEW_COMMENT_DEFAULT);
  }

  getData() {
    return this._data;
  }

  setErrorState() {
    this.getElement().classList.add('shake');
  }

  enable() {
    this.getElement()
      .querySelector('.film-details__comment-input')
      .disabled = false;

    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this._emotionClickHandler);
  }

  disable() {
    this.getElement()
      .querySelector('.film-details__comment-input')
      .disabled = true;

    this.getElement()
      .querySelector('.film-details__emoji-list')
      .removeEventListener('click', this._emotionClickHandler);
  }

  clearErrorState() {
    this.getElement().classList.remove('shake');
  }

  _emotionClickHandler(evt) {
    const emotionInput = evt.target.closest('.film-details__emoji-item');
    if (!emotionInput || !evt.currentTarget.contains(emotionInput)) {
      return;
    }

    this.updateData({ emotion: emotionInput.value });
  }

  _commentInputHandler(evt) {
    this.updateData({ text: evt.currentTarget.value }, true);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this._emotionClickHandler);

    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
  }
}

export {createNewCommentTemplate};
export default NewCommentView;
