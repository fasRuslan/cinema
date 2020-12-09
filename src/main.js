// TODO Разобрать функции из утилс
// TODO Разобрать добавление карточек реализованное в видео 1:14:55
// TODO !element

// !TODO доделать рендеринг с кнопкой функция на 140 строке  доделать надо сделать чтобы она пропадала 
//TODO  

// !-------------------Импорты---------------------- //
// import классов
import SiteMenu from './view/site-menu.js'
import SortPanel from './view/sort-panel.js'

import FilmTemplate  from './view/film-list/film-template.js'
import GeneralFilms from './view/film-list/general-film-list.js'
import CommentedFilms from './view/film-list/commented-film-list.js'
import RatedFilms from './view/film-list/rated-film-list.js'

import FooterStatistic from './view/footer-statistic.js'
import FilmCard from './view/film-card.js'
import LoadMore from './view/load-more.js'
import Popup from './view/popup/popup.js'

import EmptyList from './view/emptyList.js'

// импорт тестовых данных
import {dataFilmCard} from "./mock/film.js"
// import utils function
import {render,RenderPosition,remove} from "./utils/render.js"
import {compareValues} from "./utils/compareValues.js"
// !-------------------Импорты---------------------- //






// !-------------------Счетчики---------------------- //
// create film count
const FILM_COUNT = 10; //количество фильмов
const FILM_PER_PAGE = 5
const FILM_RATED_COUNT = 2;
const FILM_COMMENT_COUNT = 2;
// !-------------------Счетчики---------------------- //




// !-------------------Работа с данными---------------------- //
// данные для фильма
const films = new Array(FILM_COUNT).fill(null).map(dataFilmCard);//данные каждого фильма
let filteredFilms = films.slice().sort(compareValues(`id`,`asc`));//данные по дефолту
// Сортировка данных для меню
const sortInfo =  {
    menu : {
    watсhList: filteredFilms.filter(item => item.repeating.isWatсhList),
    watched: filteredFilms.filter(item => item.repeating.isWatched),
    favorite: filteredFilms.filter(item => item.repeating.isFavorite),
    },
    sortPanel : {
        sortDate:filteredFilms.slice().sort(compareValues(`fullDate`,`asc`)),
        sortRating:filteredFilms.slice().sort(compareValues(`rating`,`asc`))
    }
}
// !-------------------Работа с данными---------------------- //








// !-------------------Работа с основными элементами на странице---------------------- //
// Находим элементы на страницe
const siteBody = document.querySelector('body')
const siteMainElement = document.querySelector('.main');
const siteFooterStatistics = document.querySelector('.footer__statistics');

const renderFilmCard = (container,film) => {
    const card = new FilmCard(film);
    render(container,card.getElement(),RenderPosition.BEFOREEND);
}
const filmsRated = () => {
    return filteredFilms.filter(film => compareValues(`ratind`,`asc`)).slice(0,FILM_RATED_COUNT);
}   

const filmsCommented = () => {
    return filteredFilms.filter(film => compareValues(`comments`,`asc`).slice(0,FILM_COMMENT_COUNT));
}
const footerStatistic = new FooterStatistic(); 
const loadMore = new LoadMore();
const emptyList = new EmptyList();

// Добавить ссылку для класса FilmListgit


//  Рендерим основные элементы на странице
const renderMenu = () => {
    const menu = new SiteMenu(sortInfo);
    const sortPanel = new SortPanel();

    render(siteMainElement, menu.getElement(), RenderPosition.BEFOREEND);
    render(siteMainElement, sortPanel.getElement(), RenderPosition.BEFOREEND);

}
const renderFilms = () => {
    const filmTemplate = new FilmTemplate();
    const generalFilms = new GeneralFilms();
    const ratedFilms = new RatedFilms();
    const commentedFilms = new CommentedFilms();

    // console.log(filmTemplate.getDomElement())


    render(siteMainElement, filmTemplate.getElement(), RenderPosition.BEFOREEND);
    render(filmTemplate.getElement(),generalFilms.getElement(),RenderPosition.BEFOREEND);

    render(filmTemplate.getElement(),ratedFilms.getElement(),RenderPosition.BEFOREEND);
    render(filmTemplate.getElement(),commentedFilms.getElement(),RenderPosition.BEFOREEND);

}
renderMenu()
renderFilms()



render(siteFooterStatistics, footerStatistic.getElement(), RenderPosition.BEFOREEND);
// !-------------------Работа с основными элементами на странице---------------------- //



// !-------------------Работа с внутренними элементами на странице---------------------- //
const filmsContainer = document.querySelector('.films-list'); //Контейнер для отрисовки кнопки;


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
if (filteredFilms.length > 0) {
    let renderFilmsCount = FILM_PER_PAGE;//Записываем количество фильмов
    render(filmsContainer, loadMore.getElement(),RenderPosition.BEFOREEND);// Рендерим кнопку

    const renderLoadMore = () => {
        loadMore.setClickHandler(loadMoreFilms);
    }


    function loadMoreFilms() {
        filteredFilms
        .slice(renderFilmsCount, renderFilmsCount+FILM_PER_PAGE)//берем следующие 5 элементов если они есть
        .forEach((film) => {
            renderFilmCard(filmList,film);
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

// Проблемы с кнопкой
// !-------------------Работа с внутренними элементами на странице---------------------- //









// !-------------------Работа с сортировкой в меню и панелью управления---------------------- //
// ? Как получить кнопку
// *Общий список фильмов
menu.setClickHandler((evt) => {
    menu.removeActiveLink()
        evt.target.classList.add('main-navigation__item--active');
        const dataSort = evt.target.getAttribute('data-sort');
        filmList.innerHTML = ``;
        if(dataSort === 'all'){
        for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(filteredFilms[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }else if(dataSort === 'watchlist'){
            console.log(new FilmCard(sortInfo.menu.watсhList[0]))
             for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(sortInfo.menu.watсhList[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }else if(dataSort === 'history'){
            for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(sortInfo.menu.watched[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }else if(dataSort === 'favorites'){
            for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(sortInfo.menu.favorite[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }
}); 

sortPanel.setClickHandler((evt) => {
        sortPanel.removeActiveLink()
        evt.target.classList.add(`sort__button--active`);
        const dataSort = evt.target.getAttribute('data-sort');
        filmList.innerHTML = ``;
        if (dataSort === `default`) {
            for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(filteredFilms[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }else if (dataSort === `date`) {
            for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(sortInfo.sortPanel.sortDate[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }else if (dataSort === `rating`) {
            for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(sortInfo.sortPanel.sortRating[i]).getElement(), RenderPosition.BEFOREEND);
            };
    }
});

// !-------------------Работа с сортировкой и панелью управления---------------------- //






// !-------------------Работа с popup---------------------- //

const escHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc'){
        evt.preventDefault();
        document.querySelector('.film-details').remove();
    }
}
siteBody.addEventListener(`keydown`, escHandler);

siteBody.addEventListener(`click`,(e) => {
    const target = e.target;
    if (target.closest(`.js-open-popup`)) {
        showPopup(target.closest('.film-card').getAttribute(`id`));
    }
});

const showPopup = (id) => {
    let film = films.filter((item) => item.id === id)[0];
    render(siteBody,new Popup(film).getElement(),RenderPosition.BEFOREEND);
};

siteBody.addEventListener(`click`, (e) => {
    let target = e.target;
    if(target.classList.contains(`film-details__close-btn`) === true){
        document.querySelector('.film-details').remove()
    };
});
// !-------------------Работа с popup---------------------- //


