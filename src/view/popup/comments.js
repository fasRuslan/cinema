// TODO refactoring commentsTime
import Abstract from '../abstract.js'
import dayjs from 'dayjs'
    const createCommentTemplate = (comment) => {

      console.log(comment)

      const {id, info:{text,author,emotion},commentsTime} = comment;

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
    switch(emotion){
        case`smile`:
          return `smile.png`
            break;
        case `sleeping`:
          return `sleeping.png`
            break;
        case  `puke`:
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


    return `<ul class="film-details__comments-list">
            ${comments.map((comment) => createCommentTemplate(comment) ).join(``) }
          </ul>`
};