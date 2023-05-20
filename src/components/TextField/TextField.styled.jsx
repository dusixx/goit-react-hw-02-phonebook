import styled from '@emotion/styled';
import { ButtonBase, FlexCentered } from 'styles/shared';
import { def, calc } from './params';

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  width: ${calc.fieldWidth};
`;

export const InputWrapper = styled.div`
  position: relative;
  ${FlexCentered(`justify-content: auto`)};

  height: ${calc.fieldHeight};
  width: 100%;
  color: ${def.iconColor};
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 ${calc.paddingRight} 0 ${calc.paddingLeft};

  font-family: inherit;
  font-size: ${calc.fontSize};

  background-color: white;
  border-radius: ${calc.borderRadius};

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
  left: ${calc.iconOffset};
  height: ${calc.iconHeight};

  color: currentColor;
  transform: translateY(-50%);
`;

export const ClearInputBtn = styled(ButtonBase)`
  position: absolute;
  top: 50%;
  right: ${calc.clearBtnOffset};

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
  margin-left: ${calc.borderRadius};

  color: ${({ color }) => color || def.validationColor};
  font-size: ${calc.validationFontSize};
`;
