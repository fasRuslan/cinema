import Abstract from './abstract.js'

const createFooterStatisticTemplate = () => {
    return ` <p>130 291 movies inside</p>`
}


export default class FooterStatistic extends Abstract{
    getTemplate (){
        return createFooterStatisticTemplate();
    }
}