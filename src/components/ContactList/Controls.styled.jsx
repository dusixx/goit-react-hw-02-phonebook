import styled from '@emotion/styled';
import { ButtonBase, FlexCentered } from 'styles/shared';
import { parseCSSValue } from 'components/utils';

const ICON_COLOR = '#a7a7a7';

const calcMobileHeight = v => {
  const { value, unit } = parseCSSValue(v);
  return `${value + value * 0.2}${unit}`;
};

export const Container = styled.div`
  ${FlexCentered(`gap: 8px`)};
  height: ${({ height }) => calcMobileHeight(height) || 'inherit'};
  min-width: 60px;

  @media screen and (min-width: 1200px) {
    height: ${({ height }) => height || 'inherit'};
  }

  @media screen and (min-width: 768px) {
    gap: 10px;
  }
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
