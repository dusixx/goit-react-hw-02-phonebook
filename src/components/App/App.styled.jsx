import styled from '@emotion/styled';
import { FlexCentered } from 'styles/shared';

export const Container = styled.div`
  margin: 0 auto 0 auto;
  padding-top: 30px;

  width: ${({ width }) => width || '100%'};
  min-width: 320px;
`;

export const Header = styled.div`
  ${FlexCentered(`justify-content: space-between`)}
  width: ${({ width }) => width || '100%'};

  & h1 {
    ${FlexCentered(`gap: 10px`)}
    font-size: 24px;
    letter-spacing: -1px;
  }
`;
