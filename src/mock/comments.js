// !import utils
import {getRandomInteger} from '../utils/randomInteger.js'

import {nanoid} from 'nanoid'




const generateComments = () => {

    const commentsInfo = [
    {
      text: `Interesting setting and a good cast`,
      author: `Tim Macoveev`,
      emotion: `smile`

    },
    {
      text: `Booooooooooring`,
      author: `John Doe`,
      emotion: `sleeping`

    },
    {
      text: `Very very old. Meh`,
      author: `Elis`,
      emotion: `puke`

    },
    {
      text: `Almost two hours? Seriously?`,
      author: `Alex`,
      emotion: `angry`
    },
    {
      text: `Very very old. Meh`,
      author: `Suzan`,
      emotion: `sleeping`
    }
    ]

    const randomIndex = getRandomInteger(0,commentsInfo.length - 1);

    return commentsInfo[randomIndex];
};


export const generateMockComments = () => {
    return {
        id:nanoid(),
        info:generateComments(),
        commentsTime:new Date(getRandomInteger(0,new Date()))
    }
}