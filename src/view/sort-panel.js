import Abstract from './abstract.js'
import {
  sortType
} from '../mock/sort.js'

const createSortPanel = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort='${sortType.DEFAULT}'>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort='${sortType.DATE}'>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort='${sortType.RATING}'>Sort by rating</a></li>
  </ul>`
}



export default class SortPanel extends Abstract {

  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortPanel();
  }

  removeActiveLink() {
    this.getElement().querySelectorAll('.sort__button--active').forEach((button) => button.classList.remove('sort__button--active'));
  }


  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this.removeActiveLink();
    evt.target.classList.add('sort__button--active');
    this._callback.sortTypeChange(evt.target.dataset.sort);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
};
