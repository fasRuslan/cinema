import {createElement} from '../utils/render.js'

export default class Abstract {
    constructor(){
        if(new.target === 'Abstract'){
            throw new Error(`Can't instance Abstract, only concret one.`)
        }
        this._element = null;
        this._callback = {};
    }

    getTemplate(){
        throw new Error(`Abstract method not implement: getTemplate`)
    }

    getElement(){
        if (!this._element) {
            this._element = createElement(this.getTemplate())
        }
        return this._element
    }

     _clickHandler(evt){
    evt.preventDefault();
    this._callback.click(evt);
  }

    removeElement(){
        this._element = null; 
    }


}