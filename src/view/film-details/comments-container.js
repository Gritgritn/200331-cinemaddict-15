import AbstractView from '../abstract.js';

const createCommentsContainerTemplate = () => '<section class="film-details__comments-wrap"></section>';

class CommentsContainerView extends AbstractView {
  getTemplate() {
    return createCommentsContainerTemplate();
  }
}

export default CommentsContainerView;
