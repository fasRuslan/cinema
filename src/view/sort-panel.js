import Abstract from './abstract.js'

const createSortPanel = () => {
    return  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort='default'>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort='date'>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort='rating'>Sort by rating</a></li>
  </ul>`
}



export default class SortPanel extends Abstract {

  constructor(){
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

   getTemplate(){
    return createSortPanel();
  }

  removeActiveLink(){
    this.getElement().querySelector('.sort__button--active').classList.remove('sort__button--active')
  }

   setClickHandler(callback){
    this._callback.click = callback;
    for (let btn of this.getElement().querySelectorAll('.sort__button')){
      btn.addEventListener(`click`,this._clickHandler);
    }
   }
};