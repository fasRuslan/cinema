// TODO refactoring commentsTime
export const createCommentsTemplate = (comments) => {

    const {id,info:{text,author,emotion},commentsTime} = comments;

    const getRandomCommentsTime = (date) => {
      const currentFullYear = date.getFullYear();
      const currentMonth = date.getMonth();
      const currentDate = date.getDate();
      const currentHours = date.getHours();
      const currentMinutes = date.getMinutes();
      return currentFullYear + `/` + currentMonth + `/` + currentDate + ` ` + currentHours + `:` + currentMinutes;
  }

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
                <span class="film-details__comment-day">${getRandomCommentsTime(commentsTime)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji(emotion)}" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">Booooooooooring</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji(emotion)}" width="55" height="55" alt="emoji-puke">
            </span>
            <div>
              <p class="film-details__comment-text">Very very old. Meh</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji(emotion)}" width="55" height="55" alt="emoji-angry">
            </span>
            <div>
              <p class="film-details__comment-text">Almost two hours? Seriously?</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">Today</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>`
};