import styled from '@emotion/styled';
import { ButtonBase } from '../../styles/shared';

export const Button = styled(ButtonBase)`
  display: inline-flex;
  gap: 0;
  width: 65px;

  font-size: 12px;
  letter-spacing: -0.5px;
  font-family: inherit;
  font-weight: inherit;
  text-transform: inherit;

  @media screen and (min-width: 768px) {
    gap: 2px;
    font-size: inherit;
    letter-spacing: 0;
    width: 100px;
  }
`;
