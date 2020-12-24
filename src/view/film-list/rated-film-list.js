import Abstract from "../abstract";

const createRatedFilmListTemplate = () => {
  return ` <section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container js-film-list-raited"></div>
      </section>`
};


export default class RatedFilms extends Abstract {

  getTemplate() {
    return createRatedFilmListTemplate();
  }
}
