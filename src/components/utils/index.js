export * from './notify';

export const isStr = v => typeof v === 'string';
export const isNum = v => !isNaN(v - parseFloat(v));
export const cap = v => (isStr(v) && v ? v[0].toUpperCase() + v.slice(1) : '');
export const calcCSSValue = v => (isNum(v) ? `${v}px` : v);

export const parseCSSValue = v => {
  const value = parseFloat(v);
  const unit = String(v).slice(String(value).length) || 'px';
  return { value, unit };
};

let id = 0;
export const getId = () => `id-${(id++).toString(16)}`;

export const formatNumber = number =>
  number.replace(/[\s-]/g, '').replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
