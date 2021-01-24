import Abstract from './abstract.js'


const createMenuItemTemplate = (filter, currentFilter) => {
  const {
    type,
    name,
    count
  } = filter;


  const PanelName = name[0].toUpperCase() + name.slice(1)

  return `<a href="#${name.toLowerCase()}" class="main-navigation__item" data-filter='${name.toLowerCase()}'>${PanelName}<span class="main-navigation__item-count">${count}</span></a>`

}



const createMenuTemplate = (filters, currentFilter) => {

  const menuItemsTemplate = filters
    .map((filter) => createMenuItemTemplate(filter, currentFilter))
    .join(``);




  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active" data-filter='all'>All movies</a>
      ${menuItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};


export default class SiteMenu extends Abstract {

  constructor(filters, currentFilter) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;
    this._clickHandler = this._clickHandler.bind(this); //Контекст на текущий объект
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilter);
  }

  removeActiveLink() {
    this.getElement().querySelectorAll('.main-navigation__item--active').forEach((button) => button.classList.remove('main-navigation__item--active'));
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    for (let btn of this.getElement().querySelectorAll('.main-navigation__item')) {
      btn.addEventListener(`click`, this._clickHandler);
    }
  }

  _clickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this.removeActiveLink();
    evt.target.classList.add('main-navigation__item--active');
    this._callback.click(evt.target.dataset.filter);
  }

};
