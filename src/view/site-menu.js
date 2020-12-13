import Abstract from './abstract.js'


const createMenuItemTemplate = (filter) => {  
    const {name,count} = filter;


    const PanelName = name[0].toUpperCase() + name.slice(1)

    return `<a href="#${name.toLowerCase()}" class="main-navigation__item" data-sort='${name.toLowerCase()}'>${PanelName}<span class="main-navigation__item-count">${count}</span></a>`

}



const createMenuTemplate = (filters) => {

  const menuItemsTemplate = filters
  .map((filter) => createMenuItemTemplate(filter))
  .join(``);

  console.log(menuItemsTemplate)
  
  


        return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active" data-sort='all'>All movies</a>
      ${menuItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`; 
};
  

export default class SiteMenu extends Abstract {

  constructor(sortInfo){
    super();
    this._sortInfo = sortInfo;
    this._clickHandler = this._clickHandler.bind(this); //Контекст на текущий объект
  }

  getTemplate(){
    return createMenuTemplate(this._sortInfo);
  }

  removeActiveLink(){
      this.getElement().querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
  }

  setClickHandler(callback){
    this._callback.click = callback;
    for (let btn of this.getElement().querySelectorAll('.main-navigation__item')){
      btn.addEventListener(`click`,this._clickHandler);
    }
  }

};






/* <a href="#watchlist" class="main-navigation__item" data-sort='watchlist'>Watchlist <span class="main-navigation__item-count">${watсhList.length}</span></a>
      <a href="#history" class="main-navigation__item" data-sort='history'>History <span class="main-navigation__item-count">${watched.length}</span></a>
      <a href="#favorites" class="main-navigation__item"  data-sort='favorites'>Favorites <span class="main-navigation__item-count">${favorite.length}</span></a> */