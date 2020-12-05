// TODO refactoring commentsTime
import dayjs from 'dayjs'
export const createCommentsTemplate = (comments) => {

    const {id,info:{text,author,emotion},commentsTime} = comments;


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

    return `<ul class="film-details__comments-list">
          <li class="film-details__comment">
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
          </li>
          <ul>`
          // <li class="film-details__comment">
          //   <span class="film-details__comment-emoji">
          //     <img src="./images/emoji/${emoji(emotion)}" width="55" height="55" alt="emoji-sleeping">
          //   </span>
          //   <div>
          //     <p class="film-details__comment-text">${text}</p>
          //     <p class="film-details__comment-info">
          //       <span class="film-details__comment-author">${author}</span>
          //       <span class="film-details__comment-day">2 days ago</span>
          //       <button class="film-details__comment-delete">Delete</button>
          //     </p>
          //   </div>
          // </li>
        //   <li class="film-details__comment">
        //     <span class="film-details__comment-emoji">
        //       <img src="./images/emoji/${emoji(emotion)}" width="55" height="55" alt="emoji-puke">
        //     </span>
        //     <div>
        //       <p class="film-details__comment-text">${text}</p>
        //       <p class="film-details__comment-info">
        //         <span class="film-details__comment-author">${author}</span>
        //         <span class="film-details__comment-day">2 days ago</span>
        //         <button class="film-details__comment-delete">Delete</button>
        //       </p>
        //     </div>
        //   </li>
        //   <li class="film-details__comment">
        //     <span class="film-details__comment-emoji">
        //       <img src="./images/emoji/${emoji(emotion)}" width="55" height="55" alt="emoji-angry">
        //     </span>
        //     <div>
        //       <p class="film-details__comment-text">${text}</p>
        //       <p class="film-details__comment-info">
        //         <span class="film-details__comment-author">${author}</span>
        //         <span class="film-details__comment-day">Today</span>
        //         <button class="film-details__comment-delete">Delete</button>
        //       </p>
        //     </div>
        //   </li>
        // </ul>`
};