// ?Добавить открытие popup
// ?Добавить комментарии 
// ?Комментарии дата, текст, смайлик отдельный файл
// !import markup
import {createMenuTemplate} from "./view/site-menu.js"
import {createSortPanel} from "./view/sort-panel.js"
import {createFilmListTemplate} from "./view/film-list.js"
import {createFooterStatisticTemplate} from "./view/footer-statistic.js"
import {createCardFilmTemplate} from "./view/film-card.js"
import {createLoadMoreButtonTemplate} from "./view/load-more.js"
import {createPopupTemplate} from "./view/popup/popup.js"
// !import mock
import {dataFilmCard} from "./mock/film-card.js"
// ! import utils
import {render} from "./utils.js"

// !create film count
const FILM_COUNT = 5;
const FILM_RATED_COUNT = 2;
const FILM_COMMENT_COUNT = 2;

// !Получаем массив с объектами из моков
const films = new Array(FILM_COUNT).fill(null).map(dataFilmCard);


// !Находим элементы на страницe
const siteBody = document.querySelector('body')
const siteMainElement = document.querySelector('.main');
const siteFooterStatistics = document.querySelector('.footer__statistics');

// ! Рендерим основные элементы на странице
render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortPanel(), 'beforeend');
render(siteMainElement,createFilmListTemplate(),'beforeend');
render(siteFooterStatistics,createFooterStatisticTemplate(),'beforeend');

//!Рендерим внутренние элементы на странице
//*Основной список фильмов
const filmList = siteMainElement.querySelector('.js-film-list-main');
//*Рейтинговый список фильмов
const filmListRated = siteMainElement.querySelector('.js-film-list-raited');
// *Самый комментируемый список фильмов
const filmListCommented = siteMainElement.querySelector('.js-film-list-commented');


for (let i = 0; i < FILM_COUNT; i++){
    render(filmList,createCardFilmTemplate(films[i]), 'beforeend');
};

for (let i = 0; i < FILM_RATED_COUNT; i++){
    render(filmListRated,createCardFilmTemplate(films[i]), 'beforeend');
};


for (let i = 0; i < FILM_COMMENT_COUNT; i++){
    render(filmListCommented,createCardFilmTemplate(films[i]), 'beforeend');
};

// !Добавляем кнопку загрузить больше
// *Общий список фильмов
const filmsContainer = siteMainElement.querySelector('.films-list');

// *Кнопка загрузить больше
render(filmsContainer,createLoadMoreButtonTemplate(),'beforeend');

// !Добавляем открытие popup

siteBody.addEventListener(`click`,(e) => {
    const target = e.target;
    if (target.closest(`.js-open-popup`)) {
        showPopup(target.closest('.film-card').getAttribute(`id`));
    }
});

const showPopup = (id) => {
    let film = films.filter((item) => item.id === id)[0];
    render(siteBody,createPopupTemplate(film),`beforeend`);
};

siteBody.addEventListener(`click`, (e) => {
    let target = e.target;
    if(target.classList.contains(`film-details__close-btn`) === true){
        document.querySelector('.film-details').remove()
    };
});


