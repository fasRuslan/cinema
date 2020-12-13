import {dataFilmCard} from './film.js'
import {compareValues} from "../utils/compareValues.js"

export const newSortInfo = {
    watchlist: (films) => films
    .filter(item => item.repeating.watchlist)
    .filter(item => item.repeating.watchlist).length,
    history: (films) => films
    .filter(item => item.repeating.history)
    .filter(item => item.repeating.history).length,
    favorite: (films) => films
    .filter(item => item.repeating.favorite)
    .filter(item => item.repeating.favorite).length
}


export const generateFilters = (films) => {
    return Object.entries(newSortInfo).map(([filterName,countFilm]) => {
        return {
            name: filterName,
            count:countFilm(films),
        }
    })
};