import { get } from 'svelte/store';
import { positions } from './stores/positions';

const getAnimation = (name, from, to) => `@keyframes ${name} {
  from { 
    ${from}
  }
  to {
    ${to}
  }
}`;

const filename = 'g03.jpg';
const selectorBig = '.game';
const selectorSmall = `[src="/nintenday/${filename}"]`;
const animationName = 'expand';
const style = document.createElement('style');
const duration = 400;

document.head.appendChild(style);

let animation = false;

export const expand = () => {
  if (animation) {
    return;
  }

  animation = true;

  const bigGame = document.querySelector(selectorBig);
  const smallGame = document.querySelector(selectorSmall);

  const r = get(positions)[filename]?.r || 0;

  smallGame.style = `transform: translate(-50%, -50%) rotate(${-r}deg); transform-origin: center center`;
  const s = smallGame.getBoundingClientRect();
  smallGame.style = undefined;
  const b = bigGame.getBoundingClientRect();

  const h = s.width / b.width;
  const v = s.height / b.height;

  const x = s.x - (b.x + (b.width - s.width) / 2);
  const y = s.y - (b.y + (b.height - s.height) / 2);

  const keyframes = getAnimation(
    animationName,
    `transform: matrix(${h}, 0, 0, ${v}, ${x}, ${y}) rotate(${r}deg); transform-origin: center center; visibility: visible; z-index: 1;`,
    'visibility: visible; z-index: 1;'
  );

  style.innerHTML = `${keyframes} ${selectorBig} {animation: ${animationName} ${duration}ms ease-in; animation-fill-mode: forwards}`;

  return new Promise((resolve) => {
    setTimeout(() => {
      style.innerHTML = '';
      animation = false;
      resolve();
    }, duration);
  });
};
