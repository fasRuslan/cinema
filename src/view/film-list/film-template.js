import Abstract from "../abstract";

export const createFilmListTemplate = () => {
    return `<section class="films"></section>`
};

export default class FilmTemplate extends Abstract{

  getTemplate(){
    return createFilmListTemplate();
  }

  // getDomElement(){
  //   return this.getTemplate().querySelector('.films')
  // }
}