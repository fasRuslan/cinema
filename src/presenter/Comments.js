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
  constructor(container) {
    this._container = container;
    this._comments = null;
    this._commentsListData = {};
    this._handleCommentsChange = this._handleCommentsChange.bind(this);
  }

  init(filmComments) {
    this._filmComments = filmComments;
    this._renderComments();

    addEventListener('keydown', (evt) => this.updateComments(evt));
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
    this._comments.setAddCommentEmotion((evt) => this._addComments(evt))
    this._comments.setDeleteCommentEmotion((evt) => this._deleteComment(evt));
  }


  _handleCommentsChange(deleteComments) {
    this._film.comments = updateItem(this._film.comments, deleteComments)
  }

  _addComments(evt) {
    this._addEmotion(evt);
    this._newCommentsData(evt)
    const commentsInput = this._comments.getElement().querySelector('.film-details__comment-input');
  }

  _addEmotion(evt) {
    const label = this._comments.getElement().querySelector('.film-details__add-emoji-label');
    const emoji = evt.target.value;
    this._resetLabel(label)
    this._addLabelEmotion(label, emoji)
  }

  _addLabelEmotion(label, emoji) {
    label.insertAdjacentHTML(RenderPosition.BEFOREEND, `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">`)
  }

  _resetLabel(label) {
    label.innerHTML = '';
  }

  _newCommentsData(evt) {
    const emoji = evt.target.value;
    const label = this._comments.getElement().querySelector('.film-details__comment-input').value;
    const date = dayjs().format(`YYYY/MM/DD HH:mm`);
    this._commentsListData = {
      id: nanoid(),
      info: {
        text: label,
        author: 'Alex',
        emotion: emoji
      },
      commentsTime: date
    };
  }
}
