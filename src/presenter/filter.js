import MenuTemplateView from '../view/menu.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filters.js';
import {FilterType, UpdateType, Screen} from '../const.js';

class Filter {
  constructor(filterContainer, filterModel, filmsModel, renderScreen) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._renderScreen = renderScreen;

    this._filterComponent = null;
    this._activeItem = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatisticClick = this._handleStatisticClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new MenuTemplateView(filters, this._filterModel.getFilter(), this._activeItem);

    this._filterComponent.setStatisticClickHandler(this._handleStatisticClick);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleStatisticClick() {
    this._activeItem = FilterType.STATS;
    this.init();
    this._renderScreen(Screen.STATISTIC);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    this._activeItem = '';
    this.init();
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);

    this._renderScreen(Screen.FILMS);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL_MOVIES,
        name: 'All movies',
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}

export default Filter;
