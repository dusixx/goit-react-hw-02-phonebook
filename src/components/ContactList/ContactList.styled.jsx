import styled from '@emotion/styled';
import { calcCSSValue } from 'components/utils';

export const Table = styled.table`
  width: ${({ width }) => calcCSSValue(width) || '100%'};

  font-family: inherit;
  font-size: 12px;

  @media screen and (min-width: 768px) {
    font-size: 14px;
  }

  border-collapse: collapse;
  background-color: white;

  & tr:nth-of-type(even) {
    background-color: var(--color-gray-lighter);
  }
`;
