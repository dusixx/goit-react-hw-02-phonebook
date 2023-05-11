export const isStr = v => typeof v === 'string';

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
