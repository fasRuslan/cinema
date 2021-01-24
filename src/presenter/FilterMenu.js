import SiteMenu from '../view/site-menu.js'

import {
  render,
  RenderPosition,
  remove,
  updateItem
} from "../utils/render.js"

import {
  FilterType,
  filter,
  UpdateType
} from '../const'





export default class FilterMenuPresenter {
  constructor(filterContainer, filterModel, cardModel, filterTypeChange) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._cardModel = cardModel;
    this._filterTypeChange = filterTypeChange;

    this._currentFilter = null;
    this._filterComponent = null;

    this._sortMenu = this._sortMenu.bind(this)
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._cardModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._filterComponent !== null) {
      this._filterComponent = null;
    }
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();

    this._filterComponent = new SiteMenu(filters, this._currentFilter);
    this._filterComponent.setClickHandler(this._handleFilterTypeChange)

    render(this._filterContainer, this._filterComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _getFilters() {
    const card = this._cardModel.getCards();

    return [{
        type: FilterType.WATCHLIST,
        name: `WATCHLIST`,
        count: filter[FilterType.WATCHLIST](card).length //все карточки с просмотренными фильмами
      },
      {
        type: FilterType.HISTORY,
        name: `HISTORY`,
        count: filter[FilterType.HISTORY](card).length //все карточки фильмов с историей
      },
      {
        type: FilterType.FAVORITE,
        name: `FAVORITE`,
        count: filter[FilterType.FAVORITE](card).length // все карточки фильмов любымых
      }
    ]
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    this._filterTypeChange(
      filterType
    );
  }

  _sortMenu(param) {

  }

  _sortNewMenu(param) {
    let sorted;
    if (param !== 'all') {
      sorted = this._sourcedFilms.slice().filter((film) => film[param] === true);
      sorted.forEach(item => this._renderCard(item, this._filmListMainContainer))
    } else {
      this._renderFilms()
    }
  }
}
