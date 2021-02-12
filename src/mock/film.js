// !import utils
import {
  getRandomInteger
} from '../utils/randomInteger.js'

import dayjs from "dayjs"
import {
  nanoid
} from "nanoid"
import {
  generateMockComments
} from "./comments.js"

// !Общая информация

const generateFilmInfo = () => {

  const filmInfo = [{
      title: "The Dance of Life",
      originalTitle: "The Dance of Life",
      filmPicture: "the-dance-of-life.jpg",
    },
    {
      title: "Sagebrush Trail",
      originalTitle: "Sagebrush Trail",
      filmPicture: "sagebrush-trail.jpg",
    },
    {
      title: "The Man with the Golden Arm",
      originalTitle: "The Man with the Golden Arm",
      filmPicture: "made-for-each-other.png",
    },
    {
      title: "Santa Claus Conquers the Martians",
      originalTitle: "Santa Claus Conquers the Martians",
      filmPicture: "santa-claus-conquers-the-martians.jpg  ",
    },
    {
      title: "Popeye the Sailor Meets Sindbad the Sailor",
      originalTitle: "Popeye the Sailor Meets Sindbad the Sailor",
      filmPicture: "popeye-meets-sinbad.png",
    }
  ];
  const getRandomIndex = getRandomInteger(1, filmInfo.length - 1);

  return filmInfo[getRandomIndex];
};
// !Количество просмотренных фильмов

// !Genre
const genres = [
  "Musica",
  "Western",
  "Drama",
  "Comedy",
  "Cartoon",
];

// !Director
const director = [
  `Anthony Mann`,
  `Christopher Jonathan`,
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
];

// !Писатели
const writers = [
  `Билли Уайлдер`,
  `Итан и Джоэл Коэны`,
  `Роберт Таун`,
  `Квентин Тарантино`,
  `Френсис Форд Коппола`,
];
const generateGenre = () => {

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];

}

// !Рейтинг
const getRandomRaiting = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return (lower + Math.random() * (upper - lower + 1)).toFixed(1);
};

// !Дата фильма
const generateFilmYearRelase = () => {

  const yearRelase = getRandomInteger(1900, 1999);
  return yearRelase;
}

// !Время фильма
const getRandomDate = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return (lower + Math.random() * (upper - lower + 1)).toFixed(2);
};

const generateTime = () => {

  const hour = getRandomInteger(1, 3);
  const minutes = getRandomInteger(0, 59);

  return hour + 'h' + ' ' + minutes + 'm';

}
// !Актеры
const actors = [
  `Alan Rickman`,
  `Benedict Cumberbatch`,
  `Benicio del Toro`,
  `Vincent Cassel`,
  `Viggo Mortensen`,
];


//   !Страны
const countries = [
  `USA`,
  `Great Britain`,
  `Canada`,
  `France`,
  `Russia`,
];

const choise = (arr, n) => {
  return new Array(n).fill(null).map(() => arr[getRandomInteger(0, arr.length - 1)]);
}
// !Полная дата

const generateFullTextDate = () => {
  const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const getRandomFullDate = dayjs().add(getRandomInteger(-100, -10), 'year').add(getRandomInteger(-10, 0), 'month').add(getRandomInteger(1, 30), 'day').format('YYYY-MM-D');
  const arrFullDate = getRandomFullDate.split(`-`) //Получаем полный массив
  const randomMonth = getRandomFullDate.split('-')[1];

  const currentTextMonth = month[randomMonth - 1];

  arrFullDate.splice(1, 1, currentTextMonth);

  return arrFullDate.join(' ');

};

// !Генерация описания
const generateFilmDescription = () => {
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const descriptionArr = description.split(". ");

  const randomDescription = new Set();

  for (let index = 0; index < descriptionArr.length; index++) {
    randomDescription.add(descriptionArr[getRandomInteger(0, descriptionArr.length - 1)]);
  }

  const randomTextDescription = Array.from(randomDescription).toString();

  return randomTextDescription;

};


const generateCommentsCount = () => {
  const COMMENT_COUNT = getRandomInteger(0, 5);
  const randomCommentsArr = new Array(COMMENT_COUNT).fill(null).map(() => generateMockComments());
  return randomCommentsArr;
}





// !Данные для отправки
export const dataFilmCard = () => {
  return {
    id: nanoid(),
    title: generateFilmInfo().title,
    originalTitle: generateFilmInfo().originalTitle,
    filmDescription: generateFilmDescription(),
    filmPicture: generateFilmInfo().filmPicture,
    genre: generateGenre(),
    rating: getRandomRaiting(1, 9),
    runTime: generateTime(),
    relase: generateFilmYearRelase(),
    watchlist: Boolean(getRandomInteger(0, 1)),
    history: Boolean(getRandomInteger(0, 1)),
    favorite: Boolean(getRandomInteger(0, 1)),
    director: choise(director, 1),
    writers: choise(director, getRandomInteger(1, 3)),
    actors: choise(actors, 2),
    date: generateFullTextDate(),
    countries: choise(director, 2),
    comments: generateCommentsCount(),
    all: true
  }
};
