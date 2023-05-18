import styled from '@emotion/styled';
import { FlexCentered } from 'styles/shared';

export const Container = styled.div`
  margin: 0 auto 0 auto;
  width: 80%;
  padding-top: 30px;

  @media screen and (min-width: 332px) {
    padding-left: 10px;
    padding-right: 10px;
  }

  @media screen and (min-width: 1200px) {
    width: 50%;
  }

  width: ${({ width }) => width || '100%'};
  //min-width: 320px;
`;

export const Header = styled.div`
  ${FlexCentered(`justify-content: space-between`)}
  width: ${({ width }) => width || '100%'};
`;

export const Logo = styled.h1`
  ${FlexCentered(`gap: 10px`)}
  font-size: 24px;
  letter-spacing: -1px;
`;

export const NoContacts = styled.p`
  ${FlexCentered(`gap: 5px`)};

  & svg {
    color: var(--color-accent);
  }
`;
