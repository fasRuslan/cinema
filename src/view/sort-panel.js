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
    this.getElement().querySelector('.sort__button--active').classList.remove('sort__button--active')
  }


  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    evt.target.classList.add('sort__button--active');
    this._callback.sortTypeChange(evt.target.dataset.sort);
  }

  // setClickHandler(callback) {
  //   this._callback.click = callback;
  //   for (let btn of this.getElement().querySelectorAll('.sort__button')) {
  //     btn.addEventListener(`click`, this._clickHandler);
  //   }
  // }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
};
