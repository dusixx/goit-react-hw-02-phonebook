import styled from '@emotion/styled';

export const TableRow = styled.tr`
  height: ${({ itemHeight }) => itemHeight};

  word-break: break-all;

  & td {
    text-align: center;
    height: inherit;

    & div[data-checkbox] {
      min-width: 20px;
    }
  }
`;
