import { Component, useRef } from 'react';

const root = document.documentElement;
let top = 0;

export const Scroll = props => {
  const ref = useRef(null);

  const disable = () => {
    //root.style.setProperty('--scroll-top', window.scrollY);
    top = ref.current.scrollY;
  };

  const enable = () => {
    // console.log(ref.current);
    //const top = root.style.getPropertyValue('--scroll-top');
    // предотвращаем автоскролинг
    root.style.scrollBehavior = 'auto';
    ref.current?.scrollTo({ top: top });
    root.style.removeProperty('scroll-behavior');
  };

  props.disable ? disable() : enable();

  return (
    <div
      ref={ref}
      style={
        props.disable
          ? {
              position: 'fixed',
              top: `-${top}px`,
              overflowY: 'scroll',
              width: '100%',
            }
          : {
              position: 'absolute',
              top: 0,
              left: 0,
              overflowY: 'scroll',
              width: '100%',
              height: '100%',
            }
      }
    >
      {props.children}
    </div>
  );
};
