import FilmList  from '../view/film-list/film-template.js'
import LoadMore from '../view/load-more.js'
import FilmCard from '../view/film-card.js'
import SiteMenu from '../view/site-menu.js'
import SortPanel from '../view/sort-panel.js'
import FooterStatistic from '../view/footer-statistic.js'
import EmptyList from '../view/emptyList.js'
import Popup from '../view/popup/popup.js'
import Comments from '../view/popup/comments.js'

import {dataFilmCard} from "../mock/film.js"

import {render,RenderPosition,remove} from "../utils/render.js"
import {compareValues} from "../utils/compareValues.js"

// Создали класс
// Выделил основные методы
// Перенес данные в филмс
// Добавил метод инициализации
// Добавить контейнер в который мы будем рендерить фильм лист
// Отрендерить филмс контейнер
// отрисовать кнопку loadmore
// Добавить карточки в основной контейне
//добавить филм кард



const FILM_COUNT = 15; 
const FILM_PER_PAGE = 5
const FILM_RATED_COUNT = 2;
const FILM_COMMENT_COUNT = 2;
let renderFilmsCount = FILM_PER_PAGE;

export default class Movie{
    
    constructor(filmsContainer){
        this._filmsContainer = filmsContainer;

        this._siteMenu = null;
        this._sortPanel = null;
        this._filmList = new FilmList();
        this._loadMore = new LoadMore();
        this._filmCard = new FilmCard();
        this._footerStatistic = null;
        this._emptyList = new EmptyList();
        // this._showPopup = null;
        this._comments = null;

        this._films = null;
        this._sortInfo = null;
        
    }

    init(films, sortInfo){
        this._films = films.slice();
        this._sortInfo = sortInfo;
        this._siteMenu = new SiteMenu(this._sortInfo);
        this._sortPanel = new SortPanel(this._films);
        this._popup = new Popup(films)
        this._footerStatistic = new FooterStatistic(this._films.length);
        this._renderMovie();
        
    }

    _renderMovie(){

        if(this._films.length > 0){
            this._renderMenu();
            this._renderSortPanel();
            this._renderGeneralFilms();
            this._renderRatedFilms();
            this._renderCommentsList();
            this._renderFooterStatistic();
        }else{
            this._renderEmptyFilmList();
        }
    }

    _renderMenu(){
        render(this._filmsContainer,this._siteMenu.getElement(),RenderPosition.BEFOREEND)
        this._siteMenu.setClickHandler((evt) => this._sortMenu(evt))
    }
    _sortMenu(evt){
        const filmListContainer = document.querySelector('.films')
        this._siteMenu.removeActiveLink();
        evt.target.classList.add('main-navigation__item--active');
        let param = evt.target.getAttribute('data-sort');
        let filteredFilms = this._films.slice();

        if(param !== 'all'){
            filteredFilms = filteredFilms.filter((film) => film.repeating[param] === true);
        }

        filmListContainer.innerHTML = '';
        
        for (let i = 0; i < filteredFilms.length; i++){
            this._renderCard(filteredFilms[i],filmListContainer);
        }
    }



    _renderSortPanel(){
        render(this._filmsContainer,this._sortPanel.getElement(),RenderPosition.BEFOREEND)
        this._sortPanel.setClickHandler((evt) => this._sortedFilms(evt))
    }

    _sortedFilms(evt){
        const filmListContainer = document.querySelector('.films')  
        this._sortPanel.removeActiveLink();
        const target = evt.target;
        target.classList.add('sort__button--active');
        let param = target.getAttribute('data-sort');
        let filteredFilms = this._films.slice();

         if(param !== 'default'){
            filteredFilms = filteredFilms.sort(compareValues(param,`desc`));
        }else{
            filteredFilms = filteredFilms.sort(compareValues(`id`,`desc`))
        }

        filmListContainer.innerHTML ='';  

         for (let i = 0; i < filteredFilms.length; i++){
            this._renderCard(filteredFilms[i],filmListContainer);
        }

    }

    _renderGeneralFilms(){
        render(this._filmsContainer,this._filmList.getElement(),RenderPosition.BEFOREEND)
        this._renderFilms()
    }

    _renderFilms(){
        this._renderFilmList(0,Math.min(this._films.length,FILM_PER_PAGE))

        if(this._films.length > FILM_PER_PAGE){
            this._renderLoadMoreButton()
        }
    }


    _renderFilmList(from,to){
        this._films.slice(from,to).forEach((film) => this._renderCard(film, this._filmList.getElement().querySelector('.js-film-list-main')))
    }

    _renderCard(film,container){
        const card = new FilmCard(film);
        render(container,card.getElement(),RenderPosition.BEFOREEND);
        card.setClickHandler(() => this._showPopup(film));
    }


    _showPopup(film){
        const siteBody = document.querySelector('body')

         this._popup = new Popup(film);
         render(this._filmsContainer,this._popup.getElement(),RenderPosition.BEFOREEND)

         const comments = new Comments(film.comments);
         render(this._popup.getCommentsContainer(), comments.getElement(),RenderPosition.BEFOREEND)

         this._popup.getElement().addEventListener(`click`, () => this._closePopup(this._popup))
    }

    _closePopup(filmPopup){
        const siteBody = document.querySelector('body')
        this._popup.getElement().remove();
        this._popup.removeElement();
        siteBody.classList.remove('hide-overflow')
        
        document.addEventListener(`keydown`,(evt) => {
            if(evt.key === 'Escape' || evt.key === 'Esc'){
                evt.preventDefault();
                this._popup.popupRemove()
        }
        })
    }

    _renderLoadMoreButton(){
        const loadMoreContainer = this._filmList.getElement().querySelector('.films-list')
        render(loadMoreContainer,this._loadMore.getElement(),RenderPosition.BEFOREEND)

        this._loadMore.setClickHandler(() => this._loadMoreFilms(renderFilmsCount));
    }
    _loadMoreFilms(){

        const filmListMainContainer = document.querySelector('.js-film-list-main')
        this._films
        .slice(renderFilmsCount, renderFilmsCount+FILM_PER_PAGE)//берем следующие 5 элементов если они есть
        .forEach((film) => {
            this._renderCard(film,filmListMainContainer);
        })

        
        
        renderFilmsCount += FILM_PER_PAGE;

         if(renderFilmsCount >= this._films.length){
            this._loadMore.getElement().remove()
            this._loadMore.removeElement()
            renderFilmsCount = FILM_PER_PAGE;
        }
        
    }

    _renderRatedFilms(){
        const filmsRated = () => {
            return this._films.filter(film => compareValues(`ratind`,`asc`)).slice(0,FILM_RATED_COUNT);
    }   

        for (let i = 0; i < FILM_RATED_COUNT; i++){
            this._renderCard(filmsRated()[i],this._filmsContainer.querySelector('.js-film-list-raited'));
    };
    }

    _renderCommentsList(){
        const filmsCommented = () => {
            return this._films.filter(film => compareValues(`comments`,`asc`)).slice(0,FILM_COMMENT_COUNT);
        }   

        for (let i = 0; i < FILM_RATED_COUNT; i++){
            this._renderCard(filmsCommented()[i],this._filmsContainer.querySelector('.js-film-list-commented'));
        };
    }

    _renderFooterStatistic(){
        const siteFooterStatistics = document.querySelector('.footer__statistics');
        render(siteFooterStatistics, this._footerStatistic.getElement(), RenderPosition.BEFOREEND);
    }

    _renderEmptyFilmList(){
        this._renderMenu();
        render(this._filmsContainer, this._emptyList.getElement(), RenderPosition.BEFOREEND)
        this._renderFooterStatistic();
    }



    renderSort(){

    }

    _filteredFilms(){

    }

    

    _renderTasks(){

    }
}