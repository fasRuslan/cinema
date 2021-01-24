import {
  createElement
} from "../utils/render";
import Abstract from './abstract.js';

const generateProfileTemplate = (filters) => {
  const watched = filters[1];
  const {
    count
  } = watched;

  const generateProfileName = (history) => {
    let name = '';
    if (count > 0 && count <= 10) {
      name = `novice`;
    } else if (count > 10 && count <= 20) {
      name = `fan`;
    } else if (count >= 21) {
      name = `movie buff`;
    }

    return name;
  }





  return `<section class="header__profile profile">
    <p class="profile__rating">${generateProfileName()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
</header>`
}


export default class Profile extends Abstract {
  constructor(sortInfo) {
    super();
    this._sortInfo = sortInfo;
  }

  getTemplate() {
    return generateProfileTemplate(this._sortInfo);
  }
}
