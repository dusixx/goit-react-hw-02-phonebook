import styled from '@emotion/styled';

export const Table = styled.table`
  width: ${({ width }) => width || '100%'};
  //min-width: 320px;

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
