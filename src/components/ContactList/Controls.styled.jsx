import styled from '@emotion/styled';
import { ButtonBase, FlexCentered } from 'styles/shared';

const ICON_COLOR = '#a7a7a7';

export const Container = styled.div`
  ${FlexCentered(`gap: 5px`)}
  height: ${({ height }) => height || 'inherit'};
`;

export const Button = styled(ButtonBase)`
  height: 100%;

  color: ${ICON_COLOR};
  transition-property: color;

  &:focus-visible,
  &:hover {
    color: var(--color-accent);
  }
`;
