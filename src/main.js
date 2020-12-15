// import классов
import Movie from './presenter/Movie'



// импорт тестовых данных
import {dataFilmCard} from "./mock/film.js"
import{generateFilters} from './mock/filter.js'

// create film count
const FILM_COUNT = 12; //количество фильмов

// данные для фильма 
const films = new Array(FILM_COUNT).fill(null).map(dataFilmCard);//данные каждого фильма
const filters = generateFilters(films)

const siteBody = document.querySelector('body')



const movie = new Movie(siteBody);
    movie.init(films, filters);





