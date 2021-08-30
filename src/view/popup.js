import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import SmartView from './smart.js';
import {isCtrlEnterEvent} from '../utils/render.js';
import {getRandomInteger} from '../utils/common.js';
import {generateData} from '../mock/film.js';

dayjs.extend(relativeTime);

const CreatePopupElement = (film) => {
  const {moviename, poster, description, premiereDate, rating, genre, runtime, isInWatchlist, isWatched, actors, isFavorite, pegi, director, writers, comments} = film;
  const date = dayjs(premiereDate).format('DD MMM YYYY');
  const hours = Math.floor(runtime / 60);
  const minutes = Math.floor(runtime) - (hours * 60);
  const watchlistClassName = isInWatchlist
    ? 'film-details__control-button--active film-details__control-button--watchlist'
    : 'film-details__control-button--watchlist';
  const watchedClassName = isWatched
    ? 'film-details__control-button--active film-details__control-button--watched'
    : 'film-details__control-button--watched';
  const favoriteClassName = isFavorite
    ? 'film-details__control-button--active film-details__control-button--favorite'
    : 'film-details__control-button--favorite';


  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${pegi}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${moviename}</h3>
              <p class="film-details__title-original">Original: The Great Flamarion</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}, Heinz Herald, Richard Weil</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}, Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${hours}h ${minutes}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${watchedClassName}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comments.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comments.commentTexts}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comments.author}</span>
                <span class="film-details__comment-day">2019/12/31 23:59</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">Booooooooooring</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">
            </span>
            <div>
              <p class="film-details__comment-text">Very very old. Meh</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">
            </span>
            <div>
              <p class="film-details__comment-text">Almost two hours? Seriously?</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">Today</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
  </section>`;
};

class PopupTemplate extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._emojiListHandler = this._emojiListHandler.bind(this);
    this._textCommentInputHandler = this._textCommentInputHandler.bind(this);
    this._createCommentHandler = this._createCommentHandler.bind(this);
    this.restoreHandlers();
  }


  _textCommentInputHandler(evt){
    evt.preventDefault();
    this._textComment = evt.target.value;
  }

  getTemplate() {
    return CreatePopupElement(this._film);
  }

  reset() {
    this.updateElement(true);
    if(this._containerEmodji){
      this._containerEmodji.innerHTML = ' ';
    }
    if(this._textComment){
      this._textComment = ' ';
    }
  }

  _popupClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
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

  restoreHandlers(){
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textCommentInputHandler);
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('click', this._emojiListHandler);
    this.getElement().addEventListener('keydown', this._createCommentHandler);
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoritesClickHandler);
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedClickHandler);
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupClickHandler)
  }

  _createCommentHandler(evt) {
    this._containerEmodji = this.getElement().querySelector('.film-details__add-emoji-label');
    if(isCtrlEnterEvent(evt) && this._containerEmodji.firstChild && this._textComment){
      evt.preventDefault();
      // this._film.comments.push(generateComment());
      const newComment = this._createComment();
      this._film.comments.push(newComment);
      this._film.film.comments.push(newComment.id);
      this.reset();
      this._callback.createCommentClick();
      this.updateElement(true);
    }
  }

  _createComment() {
    return {
      id: getRandomInteger(0, 10000),
      author: "me",
      commentTexts: this._textComment,
      commentDate: dayjs(),
      emotion: this._containerEmodji.firstElementChild.id,
    };
  }
  // _createComment() {
  //   const comment = generateComment();
  //   comment.emotion = this._containerEmodji.firstElementChild.id;
  //   comment.comment = this._textComment;
  //   comment.date = dayjs();
  //   return comment;
  // }

  setFavoritePopupButtonClick(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoritesClickHandler);
  }

  setMarkAsWatchedPopupButtonClick(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedClickHandler);
  }

  setAddToWatchlistPopupButtonClick(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setClosePopupButtonHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupClickHandler);
  }

  setDeleteCommentClickHandler(callback) {
    this._callback.deleteCommentClick = callback;
  }

  setCreateCommentClickHandler(callback) {
    this._callback.createCommentClick = callback;
  }
}

export default PopupTemplate;
