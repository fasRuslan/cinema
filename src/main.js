import Movie from './presenter/Movie'
import FilmsCardModel from './model/filmCard.js'
import FilterModel from './model/filters.js'

import {
  filter,
  FilterType,
  MenuItem
} from './const'



// импорт тестовых данных
import {
  dataFilmCard
} from "./mock/film.js"
import {
  generateFilters
} from './mock/filter.js'

// create film count
const FILM_COUNT = 12; //количество фильмов


const films = new Array(FILM_COUNT).fill(null).map(dataFilmCard); //данные каждого фильма


const cardModel = new FilmsCardModel();
const filterModel = new FilterModel();
cardModel.setCards(films)

const siteBody = document.querySelector('body')



const movie = new Movie(siteBody, cardModel, filterModel);
movie.init()
