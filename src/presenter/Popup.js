import Popup from '../view/popup/popup.js'
import Comments from '../view/popup/comments.js'
import CommentsPresenter from './Comments'
import {
  render,
  RenderPosition,
  remove,
  updateItem
} from "../utils/render.js"

import dayjs from 'dayjs'
import {
  nanoid
} from 'nanoid'


// const Mode = {
//   DEFAULT: `DEFAULT`,
//   EDITING: `EDITING`
// }



export default class {
  constructor(container, commentDataDelete, commentDataAdd, changeMode) {
    this._filmsContainer = document.querySelector('body');
    this._comments = null;
    this._popup = null;
    this._comment = null;
    this._commentsListData = {}; //Создаем объект для хранения комментариев

    this._commentDataAdd = commentDataAdd;
    this._commentDataDelete = commentDataDelete;
    // this._mode = Mode.DEFAULT;
    // this._changeMode = changeMode;


    this._closePopupClick = this._closePopupClick.bind(this)
  }

  init(film) {
    const prevPopup = this._popup;
    this._film = film;
    this._popup = new Popup(this._film);
    if (prevPopup) {
      remove(this._popup);
    }
    this._renderPopup()
  }

  _renderPopup() {
    this._filmsContainer.classList.add('hide-overflow')
    render(this._filmsContainer, this._popup.getElement(), RenderPosition.BEFOREEND)
    this._popup.getElement().addEventListener(`click`, (evt) => this._closePopupClick(evt))
    document.addEventListener(`keyup`, (evt) => this._closePopupESC(evt))
    this._renderComments()
  }

  _closePopupClick(evt) {
    if (evt.target.classList.contains('film-details__close-btn')) {
      this._close();
    }
  }

  _closePopupESC(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._close();
    }
  }

  _renderComments() {
    this._comments = new CommentsPresenter(this._popup.getCommentsContainer(), this._commentDataDelete, this._commentDataAdd)
    this._comments.init(this._film)
  }
  _close() {
    remove(this._popup);
    this._filmsContainer.classList.remove(`hide-overflow`);
  }


  // resetView() {
  //   if (this._mode !== Mode.DEFAULT) {
  //     this._renderPopup()
  //   }
  // }
}
