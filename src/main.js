// TODO Разобрать функции из утилс
// TODO Разобрать добавление карточек реализованное в видео 1:14:55
// TODO !element

// !TODO доделать рендеринг с кнопкой функция на 140 строке  доделать надо сделать чтобы она пропадала 
//TODO  

// !-------------------Импорты---------------------- //
// import классов
import SiteMenu from './view/site-menu.js'
import SortPanel from './view/sort-panel.js'
import FilmList  from './view/film-list/film-template.js'
import FooterStatistic from './view/footer-statistic.js'
import FilmCard from './view/film-card.js'
import LoadMore from './view/load-more.js'
import Popup from './view/popup/popup.js'
import Comments from './view/popup/comments.js'

import EmptyList from './view/emptyList.js'

// импорт тестовых данных
import {dataFilmCard} from "./mock/film.js"
import{generateFilters} from './mock/filter.js'
// import utils function
import {render,RenderPosition,remove} from "./utils/render.js"
import {compareValues} from "./utils/compareValues.js"
// !-------------------Импорты---------------------- //






// !-------------------Счетчики---------------------- //
// create film count
const FILM_COUNT = 15; //количество фильмов
const FILM_PER_PAGE = 5
const FILM_RATED_COUNT = 2;
const FILM_COMMENT_COUNT = 2;
// !-------------------Счетчики---------------------- //




// !-------------------Работа с данными---------------------- //
// данные для фильма 
const films = new Array(FILM_COUNT).fill(null).map(dataFilmCard);//данные каждого фильма
let filteredFilms = films.slice().sort(compareValues(`id`,`asc`));//данные по дефолту
const filters = generateFilters(films)
// !-------------------Работа с данными---------------------- //








// !-------------------Работа с основными элементами на странице---------------------- //
// Находим элементы на страницe
const siteBody = document.querySelector('body')
const siteMainElement = document.querySelector('.main');
const siteFooterStatistics = document.querySelector('.footer__statistics');

const renderFilmCard = (container,film) => {
    const card = new FilmCard(film);
    render(container,card.getElement(),RenderPosition.BEFOREEND);
    card.getElement().addEventListener('click',() => showPopup(film))
    // card.setClickHandler(() => showPopup(film))
 }
const filmsRated = () => {
    return filteredFilms.filter(film => compareValues(`ratind`,`asc`)).slice(0,FILM_RATED_COUNT);
}   

const filmsCommented = () => {
    return filteredFilms.filter(film => compareValues(`comments`,`asc`).slice(0,FILM_COMMENT_COUNT));
}


const menu = new SiteMenu(filters);
const sortPanel = new SortPanel();
const filmList = new FilmList();
const loadMore = new LoadMore();
const footerStatistic = new FooterStatistic(); 
const emptyList = new EmptyList();

// Добавить ссылку для класса FilmListgit


//  Рендерим основные элементы на странице

    render(siteMainElement, menu.getElement(), RenderPosition.BEFOREEND);
    render(siteMainElement, sortPanel.getElement(), RenderPosition.BEFOREEND);  
    render(siteMainElement, filmList.getElement(), RenderPosition.BEFOREEND);
    render(siteFooterStatistics, footerStatistic.getElement(), RenderPosition.BEFOREEND);
// !-------------------Работа с основными элементами на странице---------------------- //



// !-------------------Работа с внутренними элементами на странице---------------------- //


//*Основной список фильмов


if(films.length > 0){
    for (let i = 0; i < FILM_PER_PAGE; i++){
    const filmList = siteMainElement.querySelector('.js-film-list-main');
    renderFilmCard(filmList,filteredFilms[i]);
    };
    //*Рейтинговый список фильмов
    const filmListRated = siteMainElement.querySelector('.js-film-list-raited');    
    for (let i = 0; i < FILM_RATED_COUNT; i++){
        renderFilmCard(filmListRated,filmsRated()[i]);
    };
    // *Самый комментируемый список фильмов
    const filmListCommented = siteMainElement.querySelector('.js-film-list-commented');
    for (let i = 0; i < FILM_COMMENT_COUNT; i++){
        renderFilmCard(filmListCommented,filteredFilms[i]);
    };
} else{
    render(siteMainElement, emptyList.getElement(), RenderPosition.BEFOREEND)
}



//!-------------------Рендеринг дополнительных карточек---------------------- //

const filmsContainer = document.querySelector('.films-list'); //Контейнер для отрисовки кнопки;
if (filteredFilms.length > 0) {
    const filmListMainContainer = document.querySelector('.js-film-list-main')
    let renderFilmsCount = FILM_PER_PAGE;//Записываем количество фильмов
    render(filmsContainer, loadMore.getElement(),RenderPosition.BEFOREEND);// Рендерим кнопку

    const renderLoadMore = () => {
        loadMore.setClickHandler(loadMoreFilms);
    }


    function loadMoreFilms() {
        filteredFilms
        .slice(renderFilmsCount, renderFilmsCount+FILM_PER_PAGE)//берем следующие 5 элементов если они есть
        .forEach((film) => {
            renderFilmCard(filmListMainContainer,film);
        })

        renderFilmsCount += FILM_PER_PAGE;
        
        if(renderFilmsCount >= filteredFilms.length){
            loadMore.getElement().remove()
            loadMore.removeElement()
            renderFilmsCount = FILM_PER_PAGE;
        }

    }
    renderLoadMore();
}
// !-------------------Работа с внутренними элементами на странице---------------------- //









// !-------------------Работа с сортировкой в меню и панелью управления---------------------- //
// ? Как получить кнопку
// *Общий список фильмов
const filmListContainer = document.querySelector('.films')
menu.setClickHandler((evt) => {
    menu.removeActiveLink()
        evt.target.classList.add('main-navigation__item--active');
        let param = evt.target.getAttribute('data-sort');
        filteredFilms = films.slice();

        if(param !== 'all'){
            filteredFilms = filteredFilms.filter((film) => film.repeating[param] === true);
        }

        filmListContainer.innerHTML = '';
        
        for (let i = 0; i < filteredFilms.length; i++){
            renderFilmCard(filmList, filteredFilms[i]);
        }
}); 

sortPanel.setClickHandler((evt) => {
        sortPanel.removeActiveLink()
        evt.target.classList.add(`sort__button--active`);
        let param = evt.target.getAttribute('data-sort');
        filteredFilms = films.slice();

        if(param !== 'default'){
            filteredFilms = filteredFilms.sort(compareValues(param,`desc`))
        }else{
            filteredFilms = filteredFilms.sort(compareValues('id','desc'))
        }

        filmListContainer.innerHTML = '';

        for(let i = 0; i < filteredFilms.length; i++){
            renderFilmCard(filmList,filteredFilms[i]);
        }
});

// !-------------------Работа с сортировкой и панелью управления---------------------- //






// !-------------------Работа с popup---------------------- //

const showPopup = (film) => {
    const filmPopup = new Popup(film)
    render(siteBody,filmPopup.getElement(),RenderPosition.BEFOREEND)

    const comments = new Comments(film.comments)
    render(filmPopup.getCommentsContainer(), comments.getElement(),RenderPosition.BEFOREEND)

    siteBody.classList.add('hide-overflow')

    filmPopup.getElement().addEventListener(`click`, () => closePopup(filmPopup))

    document.addEventListener(`keydown`,(evt) => {
        if(evt.key === 'Escape' || evt.key === 'Esc'){
        evt.preventDefault();
        document.querySelector('.film-details').remove();  
        }
    })

    const closePopup = (filmPopup) => {
        filmPopup.getElement().remove();
        filmPopup.removeElement();
        siteBody.classList.remove('hide-overflow')
    }
}  
// !-------------------Работа с popup---------------------- //


