import Abstract from '../view/abstract.js';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN: {
      container.prepend(child);
      break;}
    case RenderPosition.BEFOREEND: {
      container.append(child);
      break;}
  }
};

const isCtrlEnterEvent = (evt) => evt.ctrlKey && 'Enter'.includes(evt.key);

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

const rerender = (newElement, oldElement, container, place = RenderPosition.BEFOREEND) => {
  if (oldElement) {
    replace(newElement, oldElement);
  } else {
    render(container, newElement, place);
  }
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }
  component.getElement().remove();
  component.removeElement();
};

export {rerender, remove, createElement, render, RenderPosition, replace, isCtrlEnterEvent};
