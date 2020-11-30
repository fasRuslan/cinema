import Abstract from './abstract.js'

export const createLoadMoreButtonTemplate = () => {
    return `<button class="films-list__show-more js-films-list__show-more">Show more</button>`
};



export default class LoadMore extends Abstract{
    getTemplate(){
        return createLoadMoreButtonTemplate();
    }
}