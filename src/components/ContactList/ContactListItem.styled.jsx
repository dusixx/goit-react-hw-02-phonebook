import styled from '@emotion/styled';
import { Controls as Ctrls } from './Controls';

export const TableRow = styled.tr`
  height: ${({ itemHeight }) => itemHeight};

  & td {
    text-align: center;
    height: inherit;
  }
`;

export const Controls = styled(Ctrls)`
  margin-left: auto;
`;
