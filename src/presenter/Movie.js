import FilmList from '../view/film-list/film-template.js'
import LoadMore from '../view/load-more.js'
import FilmCard from '../view/film-card.js'
import SiteMenu from '../view/site-menu.js'
import SortPanel from '../view/sort-panel.js'
import FooterStatistic from '../view/footer-statistic.js'
import EmptyList from '../view/emptyList.js'
import FilmPopupPresenter from './Popup.js'
import FilmCardPresenter from './MovieCard'


import {
  render,
  RenderPosition,
  remove,
  updateItem
} from "../utils/render.js"
import {
  compareValues
} from "../utils/compareValues.js"
import {
  nanoid
} from 'nanoid'



const FILM_PER_PAGE = 5
const FILM_RATED_COUNT = 2;
const FILM_COMMENT_COUNT = 2;
let renderFilmsCount = FILM_PER_PAGE;

export default class Movie {

  constructor(siteBody) {
    this._siteBody = siteBody;
    this._filmsContainer = siteBody.querySelector('.main');



    this._siteMenu = null;
    this._sortPanel = null;
    this._filmList = new FilmList();
    this._loadMore = new LoadMore();
    this._footerStatistic = null;
    this._emptyList = new EmptyList();
    this._popupPresenter = new FilmPopupPresenter(this._siteBody)
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleFilmCommentDelete = this._handleFilmCommentDelete.bind(this);
    this._handleFilmCommentsAdd = this._handleFilmCommentsAdd.bind(this);
    this._filmPresenter = {}; //создан для того чтобы записывать ссылки на объекты карточек по названию их уникального id


    this._filmListMainContainer = this._filmList.getElement().querySelector('.js-film-list-main');
    this._filmListRatedContainer = this._filmList.getElement().querySelector('.js-film-list-raited');
    this._filmListCommentedContainer = this._filmList.getElement().querySelector('.js-film-list-commented');
    this._loadMoreContainer = this._filmList.getElement().querySelector('.films-list')
    this._siteFooterStatistics = siteBody.querySelector('.footer__statistics');

    this._films = null;
    this._sortInfo = null;

  }

  init(films, sortInfo) {
    this._films = films.slice(); //делаем копию массива с объектами фильмов для карточек для рендеринга
    this._sourcedFilms = films.slice(); //делаем копию массива с объктами для перерисовки карточек
    this._sortInfo = sortInfo; // сюда поступает массив состоящий из объектов,   из filters которая генерируется функцией generateFilms(которая фильтрует сначала на наличие соответствию каждого из фильтров isWatchlist,isWatched,isFavorite) которая нужна нам для получения количества фильмов [watchlist тоесть добавленные к просмотру,watched помечает фильм как просмотренный,favoriets добавляет удаляет фильм в избранное]
    this._siteMenu = new SiteMenu(this._sortInfo); //длину передаем для обработки в инстанс класса меню
    this._sortPanel = new SortPanel(this._films); //в панель сортировки мы передаем копию данных массива фильмов
    this._footerStatistic = new FooterStatistic(this._films.length); //мы создаем инстанс класса и передаем в него массив который содержить в себе все фильмы
    this._renderMovie(); //после чего мы переходим к рендерингу movie

  }

  _renderMovie() {

    if (this._films.length > 0) {
      this._renderMenuContainer();
      this._renderSortPanelContainer();
      this._renderGeneralFilmsContainer();
      this._renderRatedFilmsContainer();
      this._renderCommentsListContainer();
      this._renderFooterStatistic();
    } else {
      this._renderEmptyFilmList();
    }
  }



  _renderMenuContainer() {
    render(this._filmsContainer, this._siteMenu.getElement(), RenderPosition.BEFOREEND)
    this._siteMenu.setClickHandler((evt) => this._sortMenu(evt))
  }
  _sortMenu(evt) {
    this._siteMenu.removeActiveLink();
    evt.target.classList.add('main-navigation__item--active');
    let param = evt.target.getAttribute('data-sort');
    this._clearTaskList();

    this._sortNewMenu(param);
  }

  _sortNewMenu(param) {
    let sorted;
    if (param !== 'all') {
      sorted = this._sourcedFilms.slice().filter((film) => film[param] === true);
      sorted.forEach(item => this._renderCard(item, this._filmListMainContainer))
    } else {
      this._renderFilms()
    }
  }



  _renderSortPanelContainer() {
    render(this._filmsContainer, this._sortPanel.getElement(), RenderPosition.BEFOREEND)
    this._sortPanel.setClickHandler((evt) => this._sortedFilms(evt))
  }

  _sortedFilms(evt) {
    this._sortPanel.removeActiveLink();
    const target = evt.target;
    target.classList.add('sort__button--active');
    let param = target.getAttribute('data-sort');

    let filteredFilms = this._sortedNewFilms(param);



    this._clearTaskList();

    for (let i = 0; i < filteredFilms.length; i++) {
      this._renderCard(filteredFilms[i], this._filmListMainContainer);
    }

  }

  _sortedNewFilms(param) {
    let sorted;
    if (param !== 'default') {
      sorted = this._films.slice().sort(compareValues(param, `desc`));
    } else {
      sorted = this._films.slice().sort(compareValues(`id`, `desc`))
    }
    return sorted;
  }

  _renderGeneralFilmsContainer() {
    render(this._filmsContainer, this._filmList.getElement(), RenderPosition.BEFOREEND)
    this._renderFilms()
  }

  _renderFilms() {
    this._renderFilmList(0, Math.min(this._films.length, FILM_PER_PAGE))

    if (this._films.length > FILM_PER_PAGE) {
      this._renderLoadMoreButton()
    }
  }


  _renderFilmList(from, to) {
    this._films.slice(from, to).forEach((film) => this._renderCard(film, this._filmListMainContainer))
  }

  _renderCard(film, container) {
    const card = new FilmCardPresenter(container, this._handleFilmChange, this._handleFilmCommentDelete, this._handleFilmCommentsAdd);
    card.init(film)
    this._filmPresenter[film.id] = card; //записываем инстанс этой карточки в объект под названием id этой карточки 
  }
  // !Удаление комментариев в popupe
  _handleFilmCommentDelete(updateFilm, position) {
    this._films = updateItem(this._sourcedFilms, updateFilm);
    this._filmPresenter[updateFilm.id].init(updateFilm);
    this._filmPresenter[updateFilm.id].updatePopup(updateFilm);
    document.querySelector('.film-details').scrollTop = position;
  }

  _handleFilmCommentsAdd(updateFilm) {
    this._films = updateItem(this._sourcedFilms, updateFilm);
    this._filmPresenter[updateFilm.id].init(updateFilm);
    this._filmPresenter[updateFilm.id].updatePopup(updateFilm);
  }

  _handleFilmChange(updateFilm) {
    this._films = updateItem(this._sourcedFilms, updateFilm); //возвращает нам список фильмов с обновленным фильмом
    this._filmPresenter[updateFilm.id].init(updateFilm) //нашли по уникальному id элемент презентера и вызвали у него функцию init в которую передали данные обновленного фильма
  }

  _clearTaskList() {
    Object
      .values(this._filmPresenter) //получаем массив отрендеренных фильмов
      .forEach((presenter) => presenter.destroy()) //пробегаемся и уничтожаем все фильми
    this._filmPresenter = {}; //очищаем весь фильм презентер
    this._renderFilmCount = FILM_PER_PAGE; //сбрасываем счетчик
    remove(this._loadMore) //удаляем кнопку loadmore
  }

  _renderLoadMoreButton() {
    render(this._loadMoreContainer, this._loadMore.getElement(), RenderPosition.BEFOREEND)
    this._loadMore.setClickHandler(() => this._loadMoreFilms(renderFilmsCount));
  }

  _loadMoreFilms() {
    this._films
      .slice(renderFilmsCount, renderFilmsCount + FILM_PER_PAGE)
      .forEach((film) => {
        this._renderCard(film, this._filmListMainContainer);
      })



    renderFilmsCount += FILM_PER_PAGE;

    if (renderFilmsCount >= this._films.length) {
      this._loadMore.getElement().remove()
      this._loadMore.removeElement()
      renderFilmsCount = FILM_PER_PAGE;
    }

  }

  _renderRatedFilmsContainer() {
    for (let i = 0; i < FILM_RATED_COUNT; i++) {
      this._filmsRated()[i].id = nanoid();
      this._renderCard(this._filmsRated()[i], this._filmListRatedContainer);
    };

  }

  _filmsRated() {
    return this._films.filter(film => compareValues(`rating`, `asc`)).slice(0, FILM_RATED_COUNT);
  }

  _renderCommentsListContainer() {
    for (let i = 0; i < FILM_RATED_COUNT; i++) {
      this._filmsCommented()[i].id = nanoid();
      this._renderCard(this._filmsCommented()[i], this._filmListCommentedContainer);
    };
  }

  _filmsCommented() {
    return this._films.filter(film => compareValues(`comments`, `asc`)).slice(0, FILM_COMMENT_COUNT);
  }

  _renderFooterStatistic() {
    render(this._siteFooterStatistics, this._footerStatistic.getElement(), RenderPosition.BEFOREEND);
  }

  _renderEmptyFilmList() {
    this._renderMenuContainer();
    render(this._filmsContainer, this._emptyList.getElement(), RenderPosition.BEFOREEND)
    this._renderFooterStatistic();
  }
}
