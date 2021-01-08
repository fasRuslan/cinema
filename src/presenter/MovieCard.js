import FilmCard from '../view/film-card.js'
import PopupComponent from '../view/popup/popup.js'
import commentsComponent from '../view/popup/comments.js'
import {
  render,
  RenderPosition,
  remove,
  replace
} from "../utils/render.js"

import {
  nanoid
} from 'nanoid'

import dayjs from 'dayjs'


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
}





export default class FilmCardPresenter {
  constructor(container, chandeData, commentDataDelete, commentDataAdd, changeMode) {


    this._filmsContainer = document.querySelector('body');
    this._container = container;
    this._card = null;
    this._popupComponent = null;
    this._commentsComponent = null;
    this._changeData = chandeData
    this._commentDataDelete = commentDataDelete; //Удаление комментариев
    this._commentDataAdd = commentDataAdd; //Добавление комментариев

    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;


    this._clickFilmInfo = this._clickFilmInfo.bind(this);
    this.updatePopup = this.updatePopup.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
    this._newEmoji = this._newEmoji.bind(this);
    this._addComment = this._addComment.bind(this);
  }

  init(film) {
    this._film = film;
    this._film.comments = this._film.comments;

    const prevCard = this._card;
    this._card = new FilmCard(this._film);



    this._card.setClickHandler(() => this.initPopup(this._film));
    this._card.setEditClickHandler((evt) => this._clickFilmInfo(evt));

    if (prevCard) {
      this._handleFormSubmit(this._card, prevCard);
      remove(prevCard);
      return;
    }


    this._renderCard();
  }


  _renderCard() {
    render(this._container, this._card.getElement(), RenderPosition.BEFOREEND);
  }

  initPopup(film) {
    this._popupComponent = new PopupComponent(film);
    this._filmsContainer.classList.add('hide-overflow');
    this._renderPopup()
    this._popupCallback()
    this._renderComments(film.comments)
  }

  _renderPopup() {
    render(this._filmsContainer, this._popupComponent.getElement(), RenderPosition.BEFOREEND)
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _popupCallback() {
    document.addEventListener(`keyup`, (evt) => this._closePopupESC(evt))
    this._popupComponent.getElement().addEventListener(`click`, (evt) => this._closePopupClick(evt))
  }

  updatePopup(film) {
    remove(this._popupComponent)
    this._popupComponent = new PopupComponent(film)
    this._popupCallback()
    render(this._filmsContainer, this._popupComponent.getElement(), RenderPosition.BEFOREEND)
    this._renderComments(film.comments)

  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._popupComponent)
    }
  }



  _closePopupESC(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._close();
    }
    this._mode = Mode.DEFAULT;
  }

  _closePopupClick(evt) {
    if (evt.target.classList.contains('film-details__close-btn')) {
      this._close();
    }
    this._mode = Mode.DEFAULT;
  }

  _renderComments(comments) {
    this._commentsComponent = new commentsComponent(comments)
    this._commentsComponent.setDeleteCommentEmotion((evt) => this._deleteComment(evt));
    this._commentsComponent.setCommentSend((evt) => this._addComment(evt));
    this._commentsComponent.addEmoji((evt) => this._newEmoji(evt));
    render(this._popupComponent.getCommentsContainer(), this._commentsComponent.getElement(), RenderPosition.BEFOREEND)
  }

  _close() {
    remove(this._popupComponent);
    this._filmsContainer.classList.remove(`hide-overflow`);
  }

  _clickFilmInfo(evt) {
    let type = evt.target.getAttribute('data-type');
    this._changeData(Object.assign({}, this._film, {
      [type]: !this._film[type]
    }));
  }

  _deleteComment(evt) {
    let position = evt.target.offsetTop;
    let id = evt.target.closest('.film-details__comment').getAttribute('id');
    let commentsIndex = this._film.comments.findIndex((item) => item.id === id);
    this._film.comments.splice(commentsIndex, 1);
    this._commentDataDelete(Object.assign({}, this._film, {
      comments: this._film.comments
    }), position)
  }

  _newEmoji(evt) {
    let emoji = evt.target.value;
    this._commentsComponent.getEmojiLabel().innerHTML = '';
    this._commentsComponent.getEmojiLabel().insertAdjacentHTML(RenderPosition.BEFOREEND, `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji" data-emoji=${emoji}>`);
  }

  _addComment(evt) {
    let position = document.querySelector('.film-details').scrollTop;
    if ((evt.ctrlKey) && (evt.code === `Enter`) && this._commentsComponent.getEmojiLabel().children.length !== 0 && this._commentsComponent.getCommentInput().value !== '') {
      const text = this._commentsComponent.getCommentInput().value;
      let emoji = this._commentsComponent.getEmojiLabel().firstChild.dataset.emoji;
      this._commentsListData = {
        id: nanoid(),
        info: {
          text: text,
          emotion: emoji
        },
        commentsTime: dayjs().format(`YYYY/MM/DD HH:mm`)
      };
      this._film.comments.push(this._commentsListData);
      this._commentsListData = {};

      this._commentDataAdd(Object.assign({}, this._film, {
        comments: this._film.comments
      }), position);
    }
  }

  destroy() {
    remove(this._card);
  }

  _handleFormSubmit(newCard, prevCard) {
    replace(newCard, prevCard)
  }

}
