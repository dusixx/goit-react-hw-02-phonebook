import styled from '@emotion/styled';
import { calcCSSValue } from 'components/utils';
import { ButtonBase, FlexCentered } from '../../../styles/shared';

const HEIGHT_MULT = 1;

export const TableHeader = styled.thead`
  height: ${({ itemHeight }) =>
    `calc(${calcCSSValue(itemHeight)} * ${HEIGHT_MULT})`};

  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: var(--color-gray-lighter);

  & th {
    font-weight: inherit;
  }
`;

export const HeaderControls = styled.div`
  ${FlexCentered()}
`;

export const DeleteBtn = styled(ButtonBase)`
  padding: 5px;
  font-size: 12px;
  color: var(--color-accent);
  text-decoration: underline;
`;
