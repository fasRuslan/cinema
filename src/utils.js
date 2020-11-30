//!Обьявляем функцию рендеринга в которой параметрами принимаем 
// !"container"(контэйнер в котором будет происходить отрисовка)
// !"template"(шаблон который мы будем отрисовывать - результат выполнения функции из view)
// !"place"(где конкретно мы будем выполнять отрисовку)


export const RenderPosition = {
  AFTERBEGIN:`afterbegin`,
  BEFOREEND:`beforeend`
}

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// export const render = (container,template,place) => {
//     container.insertAdjacentHTML(place,template);
// };

// ! getRandomInteger
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


// !createElement
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
