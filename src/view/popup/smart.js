import Abstract from '../abstract.js'


export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateElement(position) {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement)
    document.querySelector('.film-details').scrollTop = position;
  }

  _updateElement(evt) {
    if (!type) {
      return;
    }

    this._film = Object.assign({},
      this._data, {
        [type]: !this._data[type]
      }
    )

    let position = document.querySelector('.film-details').scrollTop;

    this.updateElement(position);
    this.restoreHandlers();
  }


  restoreHandlers() {
    throw new Error(`Abtract method not implemented: restoreHandlers`);
  }


}
