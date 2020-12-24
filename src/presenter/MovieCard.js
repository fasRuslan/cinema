import FilmCard from '../view/film-card.js'
import FilmPopupPresenter from './Popup'
import {
  render,
  RenderPosition,
  remove,
  replace
} from "../utils/render.js"



export default class FilmCardPresenter {
  constructor(container, chandeData, commentDataDelete, commentDataAdd) {

    this._container = container;
    this._card = null;
    this._changeData = chandeData
    this._commentDataDelete = commentDataDelete; //Удаление комментариев
    this._commentDataAdd = commentDataAdd; //Добавление комментариев
    this._popupPresenter = new FilmPopupPresenter(this._container, this._commentDataDelete, this._commentDataAdd);
  }

  init(film) {
    const prevCard = this._card;
    this._film = film;
    this._film.comments = this._film.comments.slice(); //делаем копию комментариев для перерисовки комментариев
    this._card = new FilmCard(this._film);
    this._card.setClickHandler(() => this._showPopup(this._film));
    this._card.setEditClickHandler((evt) => this._clickFilmInfo(evt));
    if (prevCard) {
      replace(this._card, prevCard)
    } else {
      this._renderCard();
      return;
    }

    remove(prevCard);
  }

  _showPopup(film) {
    this._popupPresenter.init(film)
  }

  updatePopup(film) {
    this._popupPresenter.init(film);
  }


  _renderCard() {
    render(this._container, this._card.getElement(), RenderPosition.BEFOREEND);
  }

  _clickFilmInfo(evt) {
    let type = evt.target.getAttribute('data-type');
    this._changeData(Object.assign({}, this._film, {
      [type]: !this._film[type]
    }));
  }

  destroy() {
    remove(this._card);
  }

}
