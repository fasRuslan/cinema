// Назавание - объект
// Рейтинг - генерируется функцией случайного числа
// Год - генерируется функцией случайного числа
// Продолжительность - генерируется функцией случайного числа
// Жанр - массив
// Описание - объект

import dayjs from "dayjs"
// !Общая информация

const generateFilmInfo = () => {

    const filmInfo = [
    {
            filmName:"The Dance of Life",
            filmPicture:"the-dance-of-life.jpg",
            filmDescription:"Burlesque comic Ralph 'Skid' Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…",
    },
    {
            filmName:"Sagebrush Trail",
            filmPicture:"sagebrush-trail.jpg",
            filmDescription:"Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…",
    },
    {
            filmName:"The Man with the Golden Arm",
            filmPicture:"made-for-each-other.png",
            filmDescription:"Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…",
    },
    {
            filmName:"Santa Claus Conquers the Martians",
            filmPicture:"santa-claus-conquers-the-martians.jpg  ",
            filmDescription:"The Martians Momar 'Mom Martian' and Kimar 'King Martian' are worried that their children Girmar 'Girl Martian' and Bomar 'Boy Marti…'",
    },
    {
            filmName:"Popeye the Sailor Meets Sindbad the Sailor",
            filmPicture:"popeye-meets-sinbad.png",
            filmDescription:"In this short, Sindbad the Sailor (presumably Bluto playing a 'role') proclaims himself, in song, to be the greatest sailor, adventurer and…",
    }
    ];
    const getRandomIndex = getRandomInteger(1,filmInfo.length - 1);

    return  filmInfo[getRandomIndex];
};

// !Жанр
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateGenre = () => {

    const genres = [
    "Musica",
    "Western",
    "Drama",
    "Comedy",
    "Cartoon",
];

    const randomIndex = getRandomInteger(0,genres.length - 1);

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

    const yearRelase = getRandomInteger(1900,1999);
    return yearRelase;
}

// !Время фильма
const getRandomDate = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return (lower + Math.random() * (upper - lower + 1)).toFixed(2);
};

const generateTime = () => {

    const hour = getRandomInteger(1,3);
    const minutes = getRandomInteger(0,59);

    return hour + 'h' + ' ' + minutes + 'm';

}
// !Количество комментариев

const generateFilmComments = () => {
    const digits = getRandomInteger(1,200);
    return digits + ` ` + `comments`;
}


// !Данные для отправки
export const dataFilmCard = () => {
    return  {
    filmName:generateFilmInfo().filmName,
    filmDescription:generateFilmInfo().filmDescription,
    filmPicture:generateFilmInfo().filmPicture,
    genre:generateGenre(),
    rating:getRandomRaiting(1,9),
    time:generateTime(),
    relase:generateFilmYearRelase(),
    comments:generateFilmComments(),
    repeating:{
        isWatсhList:Boolean(getRandomInteger(0,1)),
        isWatched:Boolean(getRandomInteger(0,1)),
        isFavorite: Boolean(getRandomInteger(0,1))
        }
    }
};





