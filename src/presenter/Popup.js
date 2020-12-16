import Popup from '../view/popup/popup.js'
import Comments from '../view/popup/comments.js'
import {
  render,
  RenderPosition,
  remove
} from "../utils/render.js"




export default class FilmPopupPresenter {
  constructor(container) {

    this._container = container;
    this._filmsContainer = this._container.querySelector('.main');

    this._popup = null;
    this._comment = null;
  }

  init(film) {
    const prevPopup = this._popup;
    this._film = film;
    this._popup = new Popup(this._film);
    if (prevPopup) {
      prevPopup.getElement().remove();
      prevPopup.removeElement()
    }


    this._renderPopup()

  }

  _renderPopup() {

    this._container.classList.add('hide-overflow')
    render(this._filmsContainer, this._popup.getElement(), RenderPosition.BEFOREEND)

    const comments = new Comments(this._film.comments);
    render(this._popup.getCommentsContainer(), comments.getElement(), RenderPosition.BEFOREEND)

    this._popup.getElement().addEventListener(`click`, (evt) => this._closePopupClick(evt))
    document.addEventListener(`keyup`, (evt) => this._closePopupESC(evt))
  }

  _closePopupClick(evt) {
    if (evt.target.classList.contains('film-details__close-btn')) {
      this._container.classList.remove('hide-overflow')
      this._popup.getElement().remove();
      this._popup.removeElement();
    }
  }

  _closePopupESC(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._popup.getElement().remove();
      this._popup.removeElement();
      this._container.classList.remove('hide-overflow')
    }
  }
}
