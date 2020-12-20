//!Обьявляем функцию рендеринга в которой параметрами принимаем 
// !"container"(контэйнер в котором будет происходить отрисовка)
// !"template"(шаблон который мы будем отрисовывать - результат выполнения функции из view)
// !"place"(где конкретно мы будем выполнять отрисовку)

import Abstract from '../view/abstract'

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
}

export const render = (container, child, place) => {

  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
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
  if (!(component instanceof Abstract)) {
    throw new Errors(`Can remove only components`);
  }

  component.getElement().remove()
  component.removeElement();
}


export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement()
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement()
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`)
  }

  parent.replaceChild(newChild, oldChild);
}

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
