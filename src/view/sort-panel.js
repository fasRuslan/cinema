import Abstract from './abstract.js'

const createSortPanel = () => {
    return  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort='default'>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort='date'>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort='rating'>Sort by rating</a></li>
  </ul>`
}



export default class SortPanel extends Abstract {

   getTemplate(){
    return createSortPanel();
  }
};