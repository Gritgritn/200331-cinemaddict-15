import AbstractView from './abstract.js';

const isFilterActive = (boolean) =>  boolean ? 'main-navigation__item--active' : '';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, count} = filter;
  return(
    `<a href="#${type}" class="main-navigation__item ${isFilterActive(currentFilterType === type)}" id="${type}">${type}${type === 'All movies' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`
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
    this._callback.filterTypeChange(evt.target.id); // Поменял evt.target.value na id
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler); // поменял change на click
  }
}

export default MenuTemplate;
