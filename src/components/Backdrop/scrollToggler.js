import './scrollOff.css';

// TODO: переписать под React и ставить overflow-y в зависимости от того,
// есть ли на боди вертикальная полоса прокуртки (есть - ставим)

const root = document.documentElement;
const body = document.body;

let instance;
let counter = 0;

export default class ScrollToggler {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  disable() {
    // note: Нет смысла вызывать повторно
    if (counter) return;

    // запоминаем позицию скрола
    root.style.setProperty('--scroll-top', window.scrollY);
    body.classList.add('scroll-off');

    counter++;
  }

  enable() {
    // не включаем скролл, если он отключался неединожды
    if (--counter < 0) counter = 0;
    if (counter) return;

    body.classList.remove('scroll-off');
    const top = root.style.getPropertyValue('--scroll-top');

    // предотвращаем автоскролинг
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top });
    root.style.removeProperty('scroll-behavior');
  }
}
