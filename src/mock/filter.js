import {
  dataFilmCard
} from './film.js'
import {
  compareValues
} from "../utils/compareValues.js"

export const newSortInfo = {
  watchlist: (films) => films
    .filter(item => item.watchlist)
    .filter(item => item.watchlist).length,
  history: (films) => films
    .filter(item => item.history)
    .filter(item => item.history).length,
  favorite: (films) => films
    .filter(item => item.favorite)
    .filter(item => item.favorite).length
}


export const generateFilters = (films) => {
  return Object.entries(newSortInfo).map(([filterName, countFilm]) => {
    return {
      name: filterName,
      count: countFilm(films),
    }
  })
};
