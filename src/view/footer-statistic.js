import Abstract from './abstract.js'

const createFooterStatisticTemplate = (count) => {
    return `<p>${count} movies inside</p>`
}


export default class FooterStatistic extends Abstract{
    constructor(count){
        super();
        this._element = null;
        this._count = count;
    }
    getTemplate(){
        return createFooterStatisticTemplate(this._count);
    }
}