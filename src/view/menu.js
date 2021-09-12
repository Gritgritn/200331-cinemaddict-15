import AbstractView from './abstract.js';

const isFilterActive = (boolean) =>  boolean ? 'main-navigation__item--active' : '';
const isStatsActive = (boolean) =>  boolean ? 'main-navigation__item--active' : '';
const SORT_TYPE_DATA_ATTR = 'data-sort-type';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, count} = filter;
  return(
    `<a href="#${type}" class="main-navigation__item ${isFilterActive(currentFilterType === type)}" data-sort-type="${type}">${type}${type === 'All movies' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType, activeItem) => {
  const isStatsChecked = activeItem === 'stats';
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional ${isStatsActive(isStatsChecked)}">Stats</a>
    </nav>`;
};

class MenuTemplate extends AbstractView {
  constructor(filters, currentFilterType, activeItem) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._activeItem = activeItem;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statisticClickHandler = this._statisticClickHandler.bind(this);
  }

  _statisticClickHandler(evt) {
    evt.preventDefault();
    this._callback.statisticClick();
  }

  setStatisticClickHandler(callback) {
    this._callback.statisticClick = callback;
    this.getElement().querySelector(`.${'main-navigation__additional'}`).addEventListener('click', this._statisticClickHandler);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter, this._activeItem);
  }

  _filterTypeChangeHandler(evt) {
    const hasAttr = evt.target.hasAttribute(SORT_TYPE_DATA_ATTR);
    if (!hasAttr) {
      return;
    }
    evt.preventDefault();

    this._callback.filterTypeChange(evt.target.getAttribute(SORT_TYPE_DATA_ATTR));
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}

export default MenuTemplate;
