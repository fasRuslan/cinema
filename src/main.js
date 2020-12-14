// import классов
import Movie from './presenter/Movie'
import Popup from './view/popup/popup.js'
import Comments from './view/popup/comments.js'


// импорт тестовых данных
import {dataFilmCard} from "./mock/film.js"
import{generateFilters} from './mock/filter.js'
// import utils function
import {render,RenderPosition,remove} from "./utils/render.js"
// !-------------------Импорты---------------------- //






// !-------------------Счетчики---------------------- //
// create film count
const FILM_COUNT = 12; //количество фильмов
// !-------------------Счетчики---------------------- //



// !-------------------Работа с данными---------------------- //
// данные для фильма 
const films = new Array(FILM_COUNT).fill(null).map(dataFilmCard);//данные каждого фильма
const filters = generateFilters(films)
// !-------------------Работа с данными---------------------- //







// !-------------------Работа с основными элементами на странице---------------------- //
// Находим элементы на страницe
const siteBody = document.querySelector('body')
const siteMainElement = document.querySelector('.main');



const movie = new Movie(siteMainElement);
    movie.init(films, filters);


// !-------------------Работа с сортировкой в меню и панелью управления---------------------- //
// ? Как получить кнопку
// *Общий список фильмов
// const filmListContainer = document.querySelector('.films')
// menu.setClickHandler((evt) => {
//     menu.removeActiveLink()
//         evt.target.classList.add('main-navigation__item--active');
//         let param = evt.target.getAttribute('data-sort');
//         filteredFilms = films.slice();

//         if(param !== 'all'){
//             filteredFilms = filteredFilms.filter((film) => film.repeating[param] === true);
//         }

//         filmListContainer.innerHTML = '';
        
//         for (let i = 0; i < filteredFilms.length; i++){
//             renderFilmCard(filmList, filteredFilms[i]);
//         }
// }); 

// sortPanel.setClickHandler((evt) => {
//         sortPanel.removeActiveLink()
//         evt.target.classList.add(`sort__button--active`);
//         let param = evt.target.getAttribute('data-sort');
//         filteredFilms = films.slice();

//         if(param !== 'default'){
//             filteredFilms = filteredFilms.sort(compareValues(param,`desc`))
//         }else{
//             filteredFilms = filteredFilms.sort(compareValues('id','desc'))
//         }

//         filmListContainer.innerHTML = '';

//         for(let i = 0; i < filteredFilms.length; i++){
//             renderFilmCard(filmList,filteredFilms[i]);
//         }
// });

// !-------------------Работа с сортировкой и панелью управления---------------------- //






// !-------------------Работа с popup---------------------- //

// const showPopup = (film) => {
//     const filmPopup = new Popup(film)
//     render(siteBody,filmPopup.getElement(),RenderPosition.BEFOREEND)

//     const comments = new Comments(film.comments)
//     render(filmPopup.getCommentsContainer(), comments.getElement(),RenderPosition.BEFOREEND)

//     siteBody.classList.add('hide-overflow')

//     filmPopup.getElement().addEventListener(`click`, () => closePopup(filmPopup))

//     document.addEventListener(`keydown`,(evt) => {
//         if(evt.key === 'Escape' || evt.key === 'Esc'){
//         evt.preventDefault();
//         document.querySelector('.film-details').remove();  
//         }
//     })

//     const closePopup = (filmPopup) => {
//         filmPopup.getElement().remove();
//         filmPopup.removeElement();
//         siteBody.classList.remove('hide-overflow')
//     }
// }  
// !-------------------Работа с popup---------------------- //


