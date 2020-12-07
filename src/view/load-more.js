import Abstract from './abstract.js'

export const createLoadMoreButtonTemplate = () => {
    return `<button class="films-list__show-more js-films-list__show-more">Show more</button>`
};



export default class LoadMore extends Abstract{
    constructor(elem){
        super();
        this._clickHandler = this._clickHandler.bind(this); //Контекст на текущий объект
    }

    getTemplate(){
        return createLoadMoreButtonTemplate();
    }

    _clickHandler(evt){
        evt.preventDefault();
        this._callback.click();
    }

    setClickHandler(callback){
        this._callback.click = callback;
        this.getElement().addEventListener(`click`,this._clickHandler)
    }

}