import FilmList from '../view/film-list/film-template.js'
import LoadMore from '../view/load-more.js'
import SiteMenu from '../view/site-menu.js'
import SortPanel from '../view/sort-panel.js'
import FooterStatistic from '../view/footer-statistic.js'
import EmptyList from '../view/emptyList.js'
import FilmCardPresenter from './MovieCard'
import Profile from '../view/profile.js'
import FilterMenuPresenter from '../presenter/FilterMenu.js'


import {
  render,
  RenderPosition,
  remove,
  updateItem
} from "../utils/render.js"
import {
  compareValues,
  sortTaskUp
} from "../utils/compareValues.js"
import {
  nanoid
} from 'nanoid'
import dayjs from 'dayjs'

import {
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  filter
} from '../const'



const FILM_PER_PAGE = 5
const FILM_RATED_COUNT = 2;
const FILM_COMMENT_COUNT = 2;

export default class Movie {

  constructor(siteBody, cardModel, filterModel) {
    this._cardModel = cardModel;
    this._filterModel = filterModel;
    this._siteBody = siteBody;
    this._filmsContainer = siteBody.querySelector('.main');
    this._profileContainer = siteBody.querySelector('header')

    this._renderCardsCount = FILM_PER_PAGE;
    this._currentSortType = SortType.DEFAULT;
    this._currentFilterType = FilterType.ALL;


    this._profile = null;
    this._siteMenu = null;
    this._sortPanel = null;
    this._filmList = new FilmList();
    this._loadMoreButtonComponent = null;
    this._footerStatistic = null;
    this._emptyList = new EmptyList();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._filmPresenter = {}; //создан для того чтобы записывать ссылки на объекты карточек по названию их уникального id

    this._handlLoadMoreButtonClick = this._handlLoadMoreButtonClick.bind(this)
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);


    this._filmListMainContainer = this._filmList.getElement().querySelector('.js-film-list-main');
    this._filmListRatedContainer = this._filmList.getElement().querySelector('.js-film-list-raited');
    this._filmListCommentedContainer = this._filmList.getElement().querySelector('.js-film-list-commented');
    this._loadMoreButtonComponentContainer = this._filmList.getElement().querySelector('.films-list')
    this._siteFooterStatistics = siteBody.querySelector('.footer__statistics');

    this._films = null;
    this._filters = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._cardModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._films = this._cardModel.getCards(); //делаем копию массива с объектами фильмов для карточек для рендеринга
    this._sourcedFilms = this._cardModel.getCards(); //делаем копию массива с объктами для перерисовки карточек
    this._filters = this._getFilters(); // сюда поступает массив состоящий из объектов,   из filters которая генерируется функцией generateFilms(которая фильтрует сначала на наличие соответствию каждого из фильтров isWatchlist,isWatched,isFavorite) которая нужна нам для получения количества фильмов [watchlist тоесть добавленные к просмотру,watched помечает фильм как просмотренный,favoriets добавляет удаляет фильм в избранное]
    this._footerStatistic = new FooterStatistic(this._films.length); //мы создаем инстанс класса и передаем в него массив который содержить в себе все фильмы
    this._renderMovie(); //после чего мы переходим к рендерингу movie

  }

  _getCards() {
    return this._cardModel.getCards();
  }

  _renderMovie() {
    this._renderProfileContainer()
    this._renderMenuContainer();
    this._renderSortPanelContainer();
    this._renderGeneralFilmsContainer();
    // this._renderRatedFilmsContainer();
    // this._renderCommentsListContainer();
    this._renderFooterStatistic();
  }


  updateFilm() {
    this._clearFilmList();
    this._renderSortPanelContainer();
    this._renderGeneralFilmsContainer();
    // this._renderRatedFilmsContainer();
  }

  _renderProfileContainer() {
    if (this._profile !== null) {
      this._profile = null;
    }
    this._profile = new Profile(this._filters);
    render(this._profileContainer, this._profile.getElement(), RenderPosition.BEFOREEND)
  }



  _renderMenuContainer() {
    if (this._filterMenu !== null) {
      this._filterMenu = null;
    }
    this._filterMenu = new FilterMenuPresenter(this._filmsContainer, this._filterModel, this._cardModel, this._handleFilterTypeChange);
    this._filterMenu.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilterType === filterType) {
      return;
    }

    this._currentFilterType = filterType;
    this._clearFilmList();

    switch (filterType) {
      case FilterType.ALL:
        this._renderFilms();
        break;
      case FilterType.WATCHLIST:
        const watchlistCard = this._cardModel.getCards().filter(card => card.watchlist);
        this._renderFilmList(watchlistCard);
        break;
      case FilterType.HISTORY:
        const historyCard = this._cardModel.getCards().filter(card => card.history);
        this._renderFilmList(historyCard);
        break;
      case FilterType.FAVORITE:
        const favoriteCard = this._cardModel.getCards().filter(card => card.favorite);
        this._renderFilmList(favoriteCard);
        break;
    }
  }

  _getFilters() {
    const card = this._cardModel.getCards();

    return [{
        type: FilterType.WATCHLIST,
        name: `WATCHLIST`,
        count: filter[FilterType.WATCHLIST](card).length //все карточки с просмотренными фильмами
      },
      {
        type: FilterType.HISTORY,
        name: `HISTORY`,
        count: filter[FilterType.HISTORY](card).length //все карточки фильмов с историей
      },
      {
        type: FilterType.FAVORITE,
        name: `FAVORITE`,
        count: filter[FilterType.FAVORITE](card).length // все карточки фильмов любымых
      }
    ]
  }



  _renderSortPanelContainer() {
    if (this._sortPanel !== null) {
      this._sortPanel = null;
    }

    this._sortPanel = new SortPanel(this._films);
    this._sortPanel.setSortTypeChangeHandler(this._handleSortTypeChange)

    render(this._filmsContainer, this._sortPanel.getElement(), RenderPosition.BEFOREEND)
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearFilmList();

    let sortedFilms;

    if (this._currentSortType !== 'default') {
      sortedFilms = this._getCards().slice().sort(compareValues(this._currentSortType, `desc`));
    } else {
      sortedFilms = this._getCards().slice().sort(compareValues(`id`, `desc`));
    }

    this._renderFilmList(sortedFilms);
  }

  _renderGeneralFilmsContainer() {
    render(this._filmsContainer, this._filmList.getElement(), RenderPosition.BEFOREEND)
    this._renderFilms()
  }

  _renderFilms() {
    const cards = this._getCards();
    const cardsCount = this._getCards().length;

    if (cardsCount === 0) {
      this._renderEmptyFilmList();
    }
    this._renderFilmList(cards.slice(0, Math.min(cardsCount, this._renderCardsCount)));

    if (cardsCount > this._renderCardsCount) {
      this._renderLoadMoreButton()
    }

  }


  _renderFilmList(films) {
    films
      .slice()
      .forEach((film) => this._renderCard(film, this._filmListMainContainer))
  }

  _renderCard(film, container) {
    const card = new FilmCardPresenter(container, this._handleViewAction, this._handleModeChange);
    card.init(film)
    this._filmPresenter[film.id] = card; //записываем инстанс этой карточки в объект под названием id этой карточки 
  }
  // !Изменение карточки фильма
  _handleViewAction(actionType, update, position) {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this._cardModel.updateFilm(actionType, update);
        this._filterModel.
        break;
      case UserAction.UPDATE_POPUP:
        this._cardModel.updateFilm(actionType, update);
        break;
      case UserAction.ADD_COMMENTS:
        this._cardModel.updateFilm(actionType, update);
        break;
      case UserAction.DELETE_COMMENTS:
        this._cardModel.updateFilm(actionType, update);
        break;
    }
    document.querySelector('.film-details').scrollTop = position;
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UserAction.UPDATE_CARD:
        this._filmPresenter[data.id].init(data);
        document.querySelector('.film-details').scrollTop = position;
        break;
      case UserAction.UPDATE_POPUP:
        this._filmPresenter[data.id].init(data);
        this._filmPresenter[data.id].updatePopup(data);
      case UserAction.ADD_COMMENTS:
        this._filmPresenter[data.id].init(data);
        this._filmPresenter[data.id].updatePopup(data);
        break;
      case UserAction.DELETE_COMMENTS:
        this._filmPresenter[data.id].init(data);
        this._filmPresenter[data.id].updatePopup(data);
    }
  }

  _clearFilmList({
    resetRenderCardCount = false,
    resetSortType = false
  } = {}) {

    const cardCount = this._getCards().length;

    Object
      .values(this._filmPresenter) //получаем массив отрендеренных фильмов
      .forEach((presenter) => presenter.destroy()) //пробегаемся и уничтожаем все фильми
    this._filmPresenter = {}; //очищаем весь фильм презентер

    remove(this._loadMoreButtonComponent); //удаляем кнопку loadmore
    this._renderCardsCount = FILM_PER_PAGE; //сбрасываем счетчик

    if (resetRenderCardCount) {
      this._renderCardsCount = FILM_PER_PAGE;
    } else {
      this._renderCardCount = Math.min(cardCount, this._renderCardsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView())
  }
  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMore();

    this._loadMoreButtonComponent.setClickHandler(this._handlLoadMoreButtonClick);

    render(this._loadMoreButtonComponentContainer, this._loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND)
  }

  _handlLoadMoreButtonClick() {
    const cardCount = this._getCards().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderCardsCount + FILM_PER_PAGE);
    const cards = this._getCards().slice(this._renderCardsCount, newRenderedCardCount);

    this._renderFilmList(cards)
    this._renderCardsCount = newRenderedCardCount;

    if (this._renderCardsCount >= cardCount) {
      remove(this._loadMoreButtonComponent)
    }

  }

  _renderRatedFilmsContainer() {
    for (let i = 0; i < FILM_RATED_COUNT; i++) {
      this._filmsRated()[i].id = nanoid();
      this._renderCard(this._filmsRated()[i], this._filmListRatedContainer);
    };

  }

  _filmsRated() {
    return this._films.filter(film => compareValues(`rating`, `desc`)).slice(0, FILM_RATED_COUNT);
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
