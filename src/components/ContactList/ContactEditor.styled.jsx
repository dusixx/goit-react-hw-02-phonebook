import styled from '@emotion/styled';
import {
  ButtonBase,
  ButtonPrimary,
  FlexCentered,
  Disabled,
} from 'styles/shared';
import { calcCSSValue } from 'components/utils';

export const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${FlexCentered(`flex-direction: column; gap: 25px`)};

  padding: 20px;
  width: ${({ width }) => calcCSSValue(width)};
  z-index: ${({ zindex }) => zindex};

  background-color: white;
  /* box-shadow: var(--box-shadow); */
  border-radius: var(--border-radius);
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
  z-index: 1;

  color: var(--color-black);
  transition-property: color;

  &:focus-visible,
  &:hover {
    color: var(--color-accent);
  }
`;

export const SaveBtn = styled(ButtonPrimary)`
  width: 70px;

  &[disabled] {
    ${Disabled}
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  height: 120px;
  overflow-y: auto;
`;
