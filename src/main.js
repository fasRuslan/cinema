// TODO Разобрать функции из утилс
// TODO Разобрать добавление карточек реализованное в видео 1:14:55
// TODO !element


// !import markup
import SiteMenu from './view/site-menu.js'
import SortPanel from './view/sort-panel.js'
import FilmList  from './view/film-list.js'
import FooterStatistic from './view/footer-statistic.js'
import FilmCard from './view/film-card.js'
import LoadMore from './view/load-more.js'
import Popup from './view/popup/popup.js'

import {createCardFilmTemplate} from "./view/film-card.js"
import {createLoadMoreButtonTemplate} from "./view/load-more.js"
import {createPopupTemplate} from "./view/popup/popup.js"
// !import mock
import {dataFilmCard} from "./mock/film-card.js"
// ! import utils
import {render,RenderPosition} from "./utils.js"

// !create film count
const FILM_COUNT = 5;
const FILM_RATED_COUNT = 2;
const FILM_COMMENT_COUNT = 2;

// !Получаем данные каждого фильм
const films = new Array(FILM_COUNT).fill(null).map(dataFilmCard);


// !Находим элементы на страницe
const siteBody = document.querySelector('body')
const siteMainElement = document.querySelector('.main');
const siteFooterStatistics = document.querySelector('.footer__statistics');



// ! Рендерим основные элементы на странице
render(siteMainElement, new SiteMenu().getElement(), 'beforeend');
render(siteMainElement, new SortPanel().getElement(), 'beforeend');
render(siteMainElement, new FilmList().getElement(), 'beforeend');
render(siteFooterStatistics, new FooterStatistic().getElement(), 'beforeend');



//!Рендерим внутренние элементы на странице
//*Основной список фильмов
const filmList = siteMainElement.querySelector('.js-film-list-main');
for (let i = 0; i < FILM_COUNT; i++){
   render(filmList,new FilmCard(films[i]).getElement(), 'beforeend');
};
//*Рейтинговый список фильмов
const filmListRated = siteMainElement.querySelector('.js-film-list-raited');
for (let i = 0; i < FILM_RATED_COUNT; i++){
    render(filmListRated,new FilmCard(films[i]).getElement(), 'beforeend');
};
// *Самый комментируемый список фильмов
const filmListCommented = siteMainElement.querySelector('.js-film-list-commented');
for (let i = 0; i < FILM_COMMENT_COUNT; i++){
    render(filmListCommented,new FilmCard(films[i]).getElement(), 'beforeend');
};

// !Добавляем кнопку загрузить больше
// *Общий список фильмов
const filmsContainer = siteMainElement.querySelector('.films-list');
// *Кнопка загрузить больше
render(filmsContainer,new LoadMore().getElement(),'beforeend');

const loadMore = filmsContainer.querySelector('.js-films-list__show-more')

const loadMoreFilms = (button) => {
    button.addEventListener(`click`,() => {
    for (let i = 0; i < FILM_COUNT; i++){
    render(filmList,new FilmCard(films[i]).getElement(), 'beforeend');
        };
    });
};

loadMoreFilms(loadMore);

// // !Функция добавления карточек для кнопки
// const renderFilmCard = (container,filmData) => {
//     const card = new FilmCard(filmData);
//     render(container, card.getElement(), RenderPosition.BEFOREEND);
//     card.getElement().addEventListener(`click`,() => showPopup(filmData));

// }

// renderFilmCard(filmList,films)

// !Добавляем открытие popup

siteBody.addEventListener(`click`,(e) => {
    const target = e.target;
    if (target.closest(`.js-open-popup`)) {
        showPopup(target.closest('.film-card').getAttribute(`id`));
    }
});

const showPopup = (id) => {
    let film = films.filter((item) => item.id === id)[0];
    render(siteBody,new Popup(film).getElement(),`beforeend`);
};

siteBody.addEventListener(`click`, (e) => {
    let target = e.target;
    if(target.classList.contains(`film-details__close-btn`) === true){
        document.querySelector('.film-details').remove()
    };
});


