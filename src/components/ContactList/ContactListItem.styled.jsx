import styled from '@emotion/styled';
import { calcCSSValue } from 'components/utils';

export const TableRow = styled.tr`
  height: ${({ itemHeight }) => calcCSSValue(itemHeight)};

  word-break: break-all;

  & td {
    text-align: center;
    height: inherit;

    & div[data-checkbox] {
      min-width: 20px;
    }
  }
`;
