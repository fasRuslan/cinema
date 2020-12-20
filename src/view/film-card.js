import Abstract from './abstract.js'

export const createCardFilmTemplate = (film) => {

  const {
    id,
    title,
    filmPicture,
    filmDescription,
    genre,
    rating,
    runTime,
    relase,
    watchlist,
    history,
    favorite,
    comments
  } = film;

  const isWatchedListButton = () => {
    return (watchlist) ? `film-card__controls-item--active` : ``
  };

  const isWatchedButton = () => {
    return (history) ? `film-card__controls-item--active` : ``
  };

  const isFavoriteButton = () => {
    return (favorite) ? `film-card__controls-item--active` : ``
  };

  const limitFilmDescription = (filmDescription, n) => {

    return (filmDescription.length < n) ? filmDescription : filmDescription.substring(0, 149) + `...`

  }

  return `<article class="film-card" id=${id}>
          <h3 class="film-card__title js-open-popup">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${relase}</span>
            <span class="film-card__duration">${runTime}</span>
            <span class="film-card__genre">'${genre}'</span>
          </p>
          <img src="./images/posters/${filmPicture}"
          alt=""
          class="film-card__poster js-open-popup" >
          <p class="film-card__description">${limitFilmDescription(filmDescription,149)}</p>
          <a class = "film-card__comments js-open-popup">${comments.length + ` comments`}</a>
          <div class="film-card__controls">
            <button class = "film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchedListButton()}"
            data-type = "watchlist" type ="button"> Add to watchlist </button>
            <button class = "film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedButton()}"
            data-type="history" type="button"> Mark as watched </button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteButton()}" data-type="favorite" type="button"> Mark as favorite </button>
          </div>
        </article>`
};

export default class FilmCard extends Abstract {

  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createCardFilmTemplate(this._film)
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    for (let button of this.getElement().querySelectorAll('.js-open-popup')) {
      button.addEventListener(`click`, this._clickHandler)
    }
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    for (let button of this.getElement().querySelectorAll('.film-card__controls-item')) {
      button.addEventListener(`click`, this._editClickHandler)
    }
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick(evt);
  }
}
