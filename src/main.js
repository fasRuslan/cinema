// TODO Разобрать функции из утилс
// TODO Разобрать добавление карточек реализованное в видео 1:14:55
// TODO !element

// !-------------------Импорты---------------------- //
// import классов
import SiteMenu from './view/site-menu.js'
import SortPanel from './view/sort-panel.js'
import FilmList  from './view/film-list.js'
import FooterStatistic from './view/footer-statistic.js'
import FilmCard from './view/film-card.js'
import LoadMore from './view/load-more.js'
import Popup from './view/popup/popup.js'

import EmptyList from './view/emptyList.js'

// импорт тестовых данных
import {dataFilmCard} from "./mock/film.js"
// import utils function
import {render,RenderPosition} from "./utils/render.js"
import {compareValues} from "./utils/compareValues.js"
// !-------------------Импорты---------------------- //






// !-------------------Счетчики---------------------- //
// create film count
const FILM_COUNT = 5;
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

// TODO Добавить для классов конст и выводить через константу
const menu = new SiteMenu(sortInfo);
const sortPanel = new SortPanel();
const filmsList = new FilmList();
const footerStatistic = new FooterStatistic(); 
const loadMore = new LoadMore();


//  Рендерим основные элементы на странице
render(siteMainElement, menu.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, sortPanel.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsList.getElement(), RenderPosition.BEFOREEND);
render(siteFooterStatistics, footerStatistic.getElement(), RenderPosition.BEFOREEND);
// !-------------------Работа с основными элементами на странице---------------------- //







// !-------------------Работа с внутренними элементами на странице---------------------- //

// TODO Сделать класс list-empty который будет возвращать пустую разметку если не будет карточек, если карточки будут рендерить их количество 


//*Основной список фильмов
const filmList = siteMainElement.querySelector('.js-film-list-main');
if(films.length > 0){
for (let i = 0; i < FILM_COUNT; i++){
   render(filmList,new FilmCard(filteredFilms[i]).getElement(), RenderPosition.BEFOREEND);
};
const filmsContainer = siteMainElement.querySelector('.films-list');
render(filmsContainer, loadMore.getElement(),RenderPosition.BEFOREEND);
//*Рейтинговый список фильмов
const filmListRated = siteMainElement.querySelector('.js-film-list-raited');
for (let i = 0; i < FILM_RATED_COUNT; i++){
    render(filmListRated,new FilmCard(filteredFilms[i]).getElement(), RenderPosition.BEFOREEND);
};
// *Самый комментируемый список фильмов
const filmListCommented = siteMainElement.querySelector('.js-film-list-commented');
for (let i = 0; i < FILM_COMMENT_COUNT; i++){
    render(filmListCommented,new FilmCard(filteredFilms[i]).getElement(), RenderPosition.BEFOREEND);
};
} else{
    loadMore.removeElement()
    render(siteMainElement, new EmptyList().getElement(), RenderPosition.BEFOREEND)
}

// Проблемы с кнопкой
// !-------------------Работа с внутренними элементами на странице---------------------- //









// !-------------------Работа с кнопкой---------------------- //
// *Общий список фильмов
// *Кнопка загрузить больше
// render(filmsContainer, loadMore.getElement(),RenderPosition.BEFOREEND);

const loadMoreButton = filmsContainer.querySelector('.js-films-list__show-more')

const loadMoreFilms = (button) => {
    button.addEventListener(`click`,() => {
    for (let i = 0; i < FILM_COUNT; i++){
    render(filmList,new FilmCard(filteredFilms[i]).getElement(), RenderPosition.BEFOREEND);
        };
    });
};

loadMoreFilms(loadMoreButton);

// 
const menuButton = siteBody.querySelectorAll('.main-navigation__item') ; 

for (let button of menuButton){
    button.addEventListener(`click`,function (evt) {
        evt.preventDefault();
        siteBody.querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
        button.classList.add('main-navigation__item--active');
        const dataSort = button.getAttribute('data-sort');
        filmList.innerHTML = ``;
        if(dataSort === 'all'){
        for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }else if(dataSort === 'watchlist'){
             for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(sortInfo.menu.watсhList[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }else if(dataSort === 'history'){
            for (let i = 0; i < FILM_COUNT; i++){
                console.log(sortInfo.isWatch)
        render(filmList,new FilmCard(sortInfo.menu.watched[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }else if(dataSort === 'favorites'){
            for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(sortInfo.menu.favorite[i]).getElement(), RenderPosition.BEFOREEND);
            };
        }
    });
}

// TODO Сделать сортировку так же константа собрать все кнопки в сорт панели удаляем активный клас находим датаатрибут и ставим если по дефолту то filtered лист filteredFilms
// TODO Берем дата атрибут и передаем в функцию compare для сортировки
// !Сортировка по датам
const sortPanelBattonAll = document.querySelectorAll('.sort__button');

for (let sortPanelButton of sortPanelBattonAll){
    sortPanelButton.addEventListener('click', function(evt){
        evt.preventDefault();
        siteBody.querySelector('.sort__button--active').classList.remove('sort__button--active');
        sortPanelButton.classList.add(`sort__button--active`);
        const dataSort = sortPanelButton.getAttribute('data-sort');
        filmList.innerHTML = ``;
        if (dataSort === `default`) {
            for (let i = 0; i < FILM_COUNT; i++){
        render(filmList,new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
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
}



// Функция добавления карточек для кнопки
// const renderFilmCard = (container,filmData) => {
//     const card = new FilmCard(filmData);
//     render(container, card.getElement(), RenderPosition.BEFOREEND);
//     card.getElement().addEventListener(`click`,() => showPopup(filmData));
// }

// renderFilmCard(filmList,films)

// !-------------------Работа с кнопкой---------------------- //






// !-------------------Работа с popup---------------------- //

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


