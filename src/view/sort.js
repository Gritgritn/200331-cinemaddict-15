import AbstractView from './abstract.js';
import {SortType} from '../const.js';

const createSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.BY_DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATE}">Sort by rating</a></li>
  </ul>`
);


class SortTemplate extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    const SORT_TYPE_DATA_ATTR = 'data-sort-type';
    evt.preventDefault();
    const hasAttr = evt.target.hasAttribute('data-sort-type');


    if (!hasAttr) {
      return;
    }


    this._callback.sortTypeChange(evt.target.getAttribute(SORT_TYPE_DATA_ATTR));
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

export default SortTemplate;
