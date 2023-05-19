export * from './notify';

export const isStr = v => typeof v === 'string';
export const isNum = v => !isNaN(v - parseFloat(v));
export const isNonEmptyArray = v => Array.isArray(v) && v.length;

export function cap(v) {
  return isStr(v) && v ? v[0].toUpperCase() + v.slice(1) : '';
}

export const calcCSSValue = v => (isNum(v) ? `${v}px` : v);

export const parseCSSValue = v => {
  const value = parseFloat(v);
  const unit = String(v).slice(String(value).length) || 'px';
  return { value, unit };
};

export const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(0x10)
    .padStart(6, 0)}`;

export function formatNumber(v) {
  if (!Number.isInteger(v)) return '';

  const digits = String(v).length;
  if (digits >= 7) return `${(v / 10 ** 6).toFixed(1)}M`;
  if (digits >= 4) return `${(v / 10 ** 3).toFixed(1)}K`;

  return String(v);
}

let id = 0;
export const getId = () => `id-${(id++).toString(16)}`;
