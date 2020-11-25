// ?Добавить открытие popup
// ?Добавить комментарии 
// ?Комментарии дата, текст, смайлик отдельный файл

// !Импортируем компоненты из markup
import {createMenuTemplate} from "./view/site-menu.js"
import {createSortPanel} from "./view/sort-panel.js"
import {createFilmListTemplate} from "./view/film-list.js"
import {createFooterStatisticTemplate} from "./view/footer-statistic.js"
import {createCardFilmTemplate} from "./view/film-card.js"
import {createLoadMoreButtonTemplate} from "./view/load-more.js"
import {createPopupTemplate} from "./view/popup.js"
// !Импортируем моки
import {dataFilmCard} from "./mock/film-card.js"

const FILM_COUNT = 5;
const FILM_RATED_COUNT = 2;
const FILM_COMMENT_COUNT = 2;


const film = new Array(FILM_COUNT).fill().map(dataFilmCard)


//!Обьявляем функцию рендеринга в которой параметрами принимаем 
// !"container"(контэйнер в котором будет происходить отрисовка)
// !"template"(шаблон который мы будем отрисовывать - результат выполнения функции из view)
// !"place"(где конкретно мы будем выполнять отрисовку)
const render = (container,template,place) => {
    container.insertAdjacentHTML(place,template);
};


// !Находим элементы на страницe
const siteMainElement = document.querySelector('.main');
const siteFooterStatistics = document.querySelector('.footer__statistics');

// ! Рендерим основные элементы на странице
render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortPanel(), 'beforeend');
render(siteMainElement,createFilmListTemplate(),'beforeend');
render(siteFooterStatistics,createFooterStatisticTemplate(),'beforeend');
render(siteFooterStatistics,createPopupTemplate(film[0]),'beforeend');

//!Рендерим внутренние элементы на странице
//*Основной список фильмов
const filmList = siteMainElement.querySelector('.js-film-list-main');
//*Рейтинговый список фильмов
const filmListRated = siteMainElement.querySelector('.js-film-list-raited');
// *Самый комментируемый список фильмов
const filmListCommented = siteMainElement.querySelector('.js-film-list-commented');


for (let i = 0; i < FILM_COUNT; i++){
    render(filmList,createCardFilmTemplate(film[i]), 'beforeend');
};

for (let i = 0; i < FILM_RATED_COUNT; i++){
    render(filmListRated,createCardFilmTemplate(film[i]), 'beforeend');
};


for (let i = 0; i < FILM_COMMENT_COUNT; i++){
    render(filmListCommented,createCardFilmTemplate(film[i]), 'beforeend');
};

// !Добавляем кнопку загрузить больше
// *Общий список фильмов
const filmsContainer = siteMainElement.querySelector('.films-list');

// *Кнопка загрузить больше
render(filmsContainer,createLoadMoreButtonTemplate(),'beforeend');

// !Добавляем открытие popup

