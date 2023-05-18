import styled from '@emotion/styled';
import { ButtonBase, ButtonPrimary, FlexCentered } from 'styles/shared';
import { calcCSSValue } from 'components/utils';

export const Form = styled.form`
  position: absolute;
  left: 50%;
  top: 50%;

  ${FlexCentered(`flex-direction: column; gap: 25px`)};
  padding: 20px;
  width: 95%;

  /* Вписываем форму по высоте, если низкий вьюпорт */
  @media screen and (max-height: ${({ formHeight }) => formHeight}px) {
    top: 10%;
    transform: translateX(-50%);
  }

  @media screen and (min-width: 540px) {
    width: ${({ width }) => calcCSSValue(width) || '500px'};
  }

  background-color: white;
  border-radius: var(--border-radius);
  z-index: ${({ zindex }) => zindex};
  transform: translate(-50%, -50%);
`;

export const Title = styled.h2`
  margin-right: auto;
  font-size: 18px;
  letter-spacing: -0.5px;
`;

export const CloseBtn = styled(ButtonBase)`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 20px;

  color: var(--color-black);
  transition-property: color;

  &:focus-visible,
  &:hover {
    color: var(--color-accent);
  }
`;

export const SaveBtn = styled(ButtonPrimary)`
  padding: 8px 25px 8px 25px;
`;
