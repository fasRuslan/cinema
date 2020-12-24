import Comments from '../view/popup/comments.js'

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




export default class CommentsPresenter {
  constructor(container, commentDataDelete, commentDataAdd) {
    this._container = container;
    this._comments = null;
    this._commentsListData = {};

    this._commentDataDelete = commentDataDelete;
    this._commentDataAdd = commentDataAdd;
  }

  init(film) {
    this._filmComments = film.comments;
    this._film = film;
    this._renderComments();

    // addEventListener('keydown', (evt) => this._addComments(evt));
  }

  updateComments(evt) {
    if (evt.key === 'Enter') {
      this._filmComments = this._filmComments.slice(); //Делаем копию комментс
      this._filmComments.push(this._commentsListData); //Пушим в конеч новый объект
      this._comments.getElement().remove()
      this._renderComments()
    }
  }

  _renderComments() {
    this._comments = new Comments(this._filmComments);
    render(this._container, this._comments.getElement(), RenderPosition.BEFOREEND)
    this._filmComments.forEach((comment) => this._commentsListData[comment.id] = comment);
    this._comments.setAddComment((evt) => this._addComments(evt))
    this._comments.setDeleteCommentEmotion((evt) => this._deleteComment(evt));
  }

  _deleteComment(evt) {
    let position = this.getPositionScroll();
    let id = evt.target.closest('.film-details__comment').getAttribute('id');
    let index = this._film.comments.findIndex((item) => item.id === id);
    this._film.comments.splice(index, 1);
    this._commentDataDelete(Object.assign({}, this._film, {
      comments: this._film.comments
    }), position);
  }

  _addComments(evt) {
    const emoji = evt.target.value; //не смог вывести в доп функцию
    this._comments.clearEmojiLabel();
    this._comments.getEmojiLabel().insertAdjacentHTML(RenderPosition.BEFOREEND, `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">`)

    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Enter') {
        const text = this._comments.getCommentInput().value;
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
        }));
      }
    })
    //! Смайлики то нажимаются то не нажимаются

  }

  getPositionScroll() {
    return document.querySelector('.film-details').scrollTop;
  }
}
