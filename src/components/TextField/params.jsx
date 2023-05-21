import { calcCSSValue } from 'components/utils';

export const def = {
  width: '100%',
  height: '40px',
  iconColor: '#363636',
  validationColor: '#d93025',
  borderColor: '#c4c4c4',
  paddingSide: 12,
};

// inputHeight и iconWidth - вычисляемые и всегда приходят в px

export const calc = {
  fieldWidth: ({ width }) => calcCSSValue(width) || def.width,
  fieldHeight: ({ height }) => calcCSSValue(height) || def.height,
  borderRadius: ({ inputHeight }) => `${inputHeight * 0.2}px`,

  fontSize: ({ inputHeight }) => `${inputHeight * 0.35}px`,
  validationFontSize: ({ inputHeight }) => `${inputHeight * 0.35 * 0.83}px`,

  iconHeight: ({ size }) => `${size ? calcCSSValue(size) : '50%'}`,
  iconOffset: ({ iconWidth }) => `${iconWidth * 0.5}px`,
  clearBtnOffset: ({ inputHeight }) => `${inputHeight * 0.2}px`,

  paddingLeft: ({ iconWidth }) =>
    `${iconWidth ? iconWidth + iconWidth * 0.5 + 5 : def.paddingSide}px`,
  paddingRight: ({ inputHeight }) =>
    `${inputHeight ? inputHeight * 0.8 : def.paddingSide}px`,
};
