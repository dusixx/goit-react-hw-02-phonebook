import styled from '@emotion/styled';
import { ButtonBase, FlexCentered } from 'styles/shared';
import { calcCSSValue } from 'components/utils';

//
// params
//

const def = {
  width: '100%',
  height: '40px',
  iconColor: '#363636',
  validationColor: '#d93025',
  borderColor: '#c4c4c4',
  paddingSide: 12,
};

const fieldWidth = ({ width }) => width || def.width;
const fieldHeight = ({ height }) => height || def.height;
const fontSize = ({ inputHeight }) => `${inputHeight * 0.35}px`;

const validationFontSize = ({ inputHeight }) =>
  `${inputHeight * 0.35 * 0.83}px`;

const borderRadius = ({ inputHeight }) => `${inputHeight * 0.2}px`;
const iconHeight = ({ size }) => `${size ? calcCSSValue(size) : '50%'}`;
const iconOffset = ({ iconWidth }) => `${iconWidth * 0.5}px`;
const clearBtnOffset = ({ inputHeight }) => `${inputHeight * 0.2}px`;

const paddingLeft = ({ iconWidth }) =>
  `${iconWidth ? iconWidth + iconWidth * 0.5 + 5 : def.paddingSide}px`;

const paddingRight = ({ inputHeight }) =>
  `${inputHeight ? inputHeight * 0.8 : def.paddingSide}px`;

//
// styles
//

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  width: ${fieldWidth};
  /* height: ${fieldHeight}; */
`;

export const InputWrapper = styled.div`
  position: relative;
  ${FlexCentered(`justify-content: auto`)};

  height: ${fieldHeight};
  /* height: 100%; */
  width: 100%;
  color: ${def.iconColor};
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;

  padding: 0;
  padding-left: ${paddingLeft};
  padding-right: ${paddingRight};

  font-family: inherit;
  font-size: ${fontSize};

  background-color: white;
  border-radius: ${borderRadius};

  border: 1px solid
    ${({ showValidationMsg }) =>
      showValidationMsg ? def.validationColor : def.borderColor};

  outline: none;
  transition-property: background-color;

  &::placeholder {
    opacity: 0.5;
    text-transform: capitalize;
  }

  &:focus-visible {
    background-color: var(--color-accent-lighter);
  }
`;

export const IconWrapper = styled.span`
  ${FlexCentered()};

  position: absolute;
  top: 50%;
  left: ${iconOffset};
  height: ${iconHeight};

  color: currentColor;
  transform: translateY(-50%);
`;

export const ClearInputBtn = styled(ButtonBase)`
  position: absolute;
  top: 50%;
  right: ${clearBtnOffset};

  height: 60%;
  padding: 3px;

  color: gray;
  transform: translateY(-50%);
  transition-property: color;

  &:focus-visible,
  &:hover {
    color: var(--color-black);
  }
`;

export const ValidationMessage = styled.p`
  margin-top: 2px;
  margin-left: ${borderRadius};
  /* letter-spacing: -0.2px; */

  color: ${({ color }) => color || def.validationColor};
  font-size: ${validationFontSize};
`;
