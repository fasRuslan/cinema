// !Импортируем компоненты из markup
import {createMenuTemplate} from "./view/site-menu.js"
import {createSortPanel} from "./view/sort-panel.js"
import {createFilmListTemplate} from "./view/film-list.js"
import {createFooterStatisticTemplate} from "./view/footer-statistic.js"
import {createCardFilmTemplate} from "./view/film-card.js"
import {createLoadMoreButtonTemplate} from "./view/load-more.js"


const FILM_COUNT = 5;
const FILM_RATED_COUNT = 2;
const FILM_COMMENT_COUNT = 2;


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

//!Рендерим внутренние элементы на странице

//*Основной список фильмов
const filmList = document.querySelector('.js-film-list-main');
//*Рейтинговый список фильмов
const filmListRated = document.querySelector('.js-film-list-raited');
// *Самый комментируемый список фильмов
const filmListCommented = document.querySelector('.js-film-list-commented');


for (let i = 0; i < FILM_RATED_COUNT; i++){
    render(filmListRated,createCardFilmTemplate(), 'beforeend');
};

for (let i = 0; i < FILM_COMMENT_COUNT; i++){
    render(filmListCommented,createCardFilmTemplate(), 'beforeend');
};


for (let i = 0; i < FILM_COUNT; i++){
    render(filmList,createCardFilmTemplate(), 'beforeend');
};

// *Кнопка загрузить больше
render(filmList,createLoadMoreButtonTemplate(),'beforeend')


