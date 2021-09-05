import AbstractView from './abstract.js';
import {SortType} from '../const.js';

const createSortTemplate = (currentSortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.RATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATE}">Sort by rating</a></li>
  </ul>`
);

const SORT_TYPE_DATA_ATTR = 'data-sort-type';

class SortTemplate extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    const hasAttr = evt.target.hasAttribute(SORT_TYPE_DATA_ATTR);


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
