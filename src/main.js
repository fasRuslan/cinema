// import классов
import Movie from './presenter/Movie'
import FilmsCardModel from './model/filmCard.js'



// импорт тестовых данных
import {
  dataFilmCard
} from "./mock/film.js"
import {
  generateFilters
} from './mock/filter.js'

// create film count
const FILM_COUNT = 12; //количество фильмов

// данные для фильма 
const films = new Array(FILM_COUNT).fill(null).map(dataFilmCard); //данные каждого фильма
const filters = generateFilters(films)

const cardModel = new FilmsCardModel();
cardModel.setCards(films)

const siteBody = document.querySelector('body')



const movie = new Movie(siteBody, cardModel);
movie.init(films, filters);
