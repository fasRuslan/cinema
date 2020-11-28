export const createCardFilmTemplate = (film) => {

  const {id,title,filmPicture,filmDescription,genre,rating,runTime,relase,repeating:{isWatсhList,isWatched,isFavorite},numberOfComments} = film;

  const isWatchedListButton = () => {
    return (isWatсhList)?`film-card__controls-item--active`:``
  };

  const isWatchedButton = () => {
    return (isWatched)?`film-card__controls-item--active`:``
  };

  const isFavoriteButton = () => {
    return (isFavorite)?`film-card__controls-item--active`:``
  };

  const limitFilmDescription = (filmDescription,n) => {

    return  (filmDescription.length < n) ? filmDescription : filmDescription.substring(0,149) + `...`
  
  }

    return `<article class="film-card js-open-popup" id=${id}>
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${relase}</span>
            <span class="film-card__duration">${runTime}</span>
            <span class="film-card__genre">'${genre}'</span>
          </p>
          <img src="./images/posters/${filmPicture}" alt="" class="film-card__poster">
          <p class="film-card__description">${limitFilmDescription(filmDescription,149)}</p>
          <a class="film-card__comments">${numberOfComments}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchedListButton()}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedButton()}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteButton()}" type="button">Mark as favorite</button>
          </div>
        </article>`
};