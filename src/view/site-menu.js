import Abstract from './abstract.js'
// TODO main-navigation__item--active передать колор

const createMenuTemplate = (sortInfo) => {

  const {menu :{watсhList, watched, favorite}} = sortInfo;

  
  


        return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active" data-sort='all'>All movies</a>
      <a href="#watchlist" class="main-navigation__item" data-sort='watchlist'>Watchlist <span class="main-navigation__item-count">${watсhList.length}</span></a>
      <a href="#history" class="main-navigation__item" data-sort='history'>History <span class="main-navigation__item-count">${watched.length}</span></a>
      <a href="#favorites" class="main-navigation__item"  data-sort='favorites'>Favorites <span class="main-navigation__item-count">${favorite.length}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`; 
};
  

export default class SiteMenu extends Abstract {
  constructor(sortInfo){
    super();
    this._sortInfo = sortInfo;
  }
  getTemplate(){
    return createMenuTemplate(this._sortInfo);
  }
};