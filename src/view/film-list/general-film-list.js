import Abstract from "../abstract";

const createGeneralFilmListTemplate = () => {
    return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container js-film-list-main"></div>

      </section>`
};

export default class GeneralFilms extends Abstract{

  getTemplate(){
    return createGeneralFilmListTemplate();
  }
}