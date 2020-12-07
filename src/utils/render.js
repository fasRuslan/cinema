//!Обьявляем функцию рендеринга в которой параметрами принимаем 
// !"container"(контэйнер в котором будет происходить отрисовка)
// !"template"(шаблон который мы будем отрисовывать - результат выполнения функции из view)
// !"place"(где конкретно мы будем выполнять отрисовку)

import Abstract from '../view/abstract'

export const RenderPosition = {
  AFTERBEGIN:`afterbegin`,
  BEFOREEND:`beforeend`
}

export const render = (container, child, place) => {

if(container instanceof Abstract){
  container = container.getElement();
}

if(child instanceof Abstract){
  child = child.getElement
}

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};


// !createElement
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export const remove = (component) => {
  if(!(component instanceof Abstract)){
    throw new Errors(`Can remove only components`);
  }

  component.getElement().remove()
  component.removeElement();
}