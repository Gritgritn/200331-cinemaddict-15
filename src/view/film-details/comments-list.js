import AbstractView from '../abstract.js';

const createCommentsListTemplate = () => '<ul class="film-details__comments-list"></ul>';

class CommentsListView extends AbstractView {
  getTemplate() {
    return createCommentsListTemplate();
  }
}

export default CommentsListView;
