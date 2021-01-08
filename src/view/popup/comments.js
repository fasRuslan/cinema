// TODO refactoring commentsTime
import Abstract from '../abstract.js'
import dayjs from 'dayjs'
const createCommentTemplate = (comment) => {


  const {
    id,
    info: {
      text,
      author,
      emotion
    },
    commentsTime
  } = comment;

  return `<li class="film-details__comment" id=${id}>
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji(emotion)}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${dayjs(commentsTime).format(`YYYY/MM/DD HH:mm`)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`

};

const emoji = (emotion) => {
  switch (emotion) {
    case `smile`:
      return `smile.png`
      break;
    case `sleeping`:
      return `sleeping.png`
      break;
    case `puke`:
      return `puke.png`
      break;
    case `angry`:
      return `angry.png`
      break;
    case `sleeping`:
      return `sleeping.png`
      break;
  }
  return null;
}
export const createCommentsTemplate = (comments) => {


  return `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      <ul class="film-details__comments-list">
            ${comments.map((comment) => createCommentTemplate(comment) ).join(``) }
      </ul>
      <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>`
};


export default class Comments extends Abstract {

  constructor(comments) {
    super();
    this._comments = comments;
    this._addComment = this._addComment.bind(this);
    this._deleteCommentEmotion = this._deleteCommentEmotion.bind(this);
    this._sendComment = this._sendComment.bind(this);
  }

  getTemplate() {
    return createCommentsTemplate(this._comments)
  }


  getEmojiLabel() {
    return this.getElement().querySelector('.film-details__add-emoji-label');
  }

  getCommentInput() {
    return this.getElement().querySelector('.film-details__comment-input');
  }


  setCommentSend(callback) {
    this._callback.sendComment = callback;
    this.getCommentInput().addEventListener(`keyup`, this._sendComment)
  }

  _sendComment(evt) {
    evt.preventDefault();
    this._callback.sendComment(evt)
  }

  clearEmojiLabel() {
    this.getEmojiLabel().innerHTML = '';
  }

  addEmoji(callback) {
    this._callback.addComment = callback;
    for (let input of this.getElement().querySelectorAll('.film-details__emoji-item')) {
      input.addEventListener(`change`, this._addComment)
    }
  }

  _addComment(evt) {
    evt.preventDefault();
    this._callback.addComment(evt)
  }

  setDeleteCommentEmotion(callback) {
    this._callback.deleteCommentEmotion = callback;
    for (let btn of this.getElement().querySelectorAll('.film-details__comment-delete')) {
      btn.addEventListener(`click`, this._deleteCommentEmotion)
    }
  }

  _deleteCommentEmotion(evt) {
    evt.preventDefault();
    this._callback.deleteCommentEmotion(evt);
  }


}
