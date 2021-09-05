import AbstractView from './abstract.js';

const isFilterActive = (boolean) =>  boolean ? 'main-navigation__item--active' : '';
const SORT_TYPE_DATA_ATTR = 'data-sort-type';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, count} = filter;
  return(
    `<a href="#${type}" class="main-navigation__item ${isFilterActive(currentFilterType === type)}" data-sort-type="${type}">${type}${type === 'All movies' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

class MenuTemplate extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    const hasAttr = evt.target.hasAttribute(SORT_TYPE_DATA_ATTR);
    if (!hasAttr) {
      return;
    }

    this._callback.filterTypeChange(evt.target.getAttribute(SORT_TYPE_DATA_ATTR)); // Поменял evt.target.value na id
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler); // поменял change на click
  }
}

export default MenuTemplate;
