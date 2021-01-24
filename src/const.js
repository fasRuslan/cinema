export const UserAction = {
  UPDATE_CARD: `UPDATE_CARD`,
  UPDATE_POPUP: `UPDATE_POPUP`,
  ADD_COMMENTS: `ADD_COMMENTS`,
  DELETE_COMMENTS: `DELETE_COMMENTS`
}

export const UpdateType = {
  PATCH: `PATCH`, //когда вы делаете обратно совместимые исправления
  MAJOR: `MAJOR`, //когда вы добавляете новую функциональность, не нарушая обратной совместимости.//Сортировки списка
  MINOR: `MINOR` //когда сделаны обратно несовместимые изменения API (обновление карточки,обновление popup,обновление комментариев,удаление комментариев)
}

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorite'
}

export const filter = {
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.watchlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.history),
  [FilterType.FAVORITE]: (cards) => cards.filter((card) => card.favorite)
};
