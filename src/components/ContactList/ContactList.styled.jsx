import styled from '@emotion/styled';

export const Table = styled.table`
  width: ${({ width }) => width || '100%'};

  font-family: inherit;
  font-size: 14px;

  border-collapse: collapse;
  background-color: white;

  & tr:nth-of-type(even) {
    background-color: var(--color-gray-lighter);
  }
`;
