import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { isStr } from 'components/utils';

export const FlexCentered = cssProps => css`
  display: flex;
  align-items: center;
  justify-content: center;
  ${isStr(cssProps) ? css(cssProps) : { ...cssProps }}
`;

export const ButtonBase = styled.button`
  ${FlexCentered(`gap: 5px`)}
  padding: 0;

  color: currentColor;
  background-color: transparent;
  border: none;
  cursor: pointer;

  transition-timing-function: var(--trans-func);
  transition-duration: var(--trans-duration);
`;

export const ButtonPrimary = styled(ButtonBase)`
  padding: 7px 10px 7px 10px;
  font-size: 14px;
  color: white;

  background-color: var(--color-accent);
  border-radius: 8px;
  transition-property: filter;

  &:focus-visible,
  &:hover {
    filter: brightness(1.1);
  }
`;

export const Block = styled.div`
  ${FlexCentered()}

  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height};

  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-top: ${({ marginTop }) => marginTop};

  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  overflow: hidden;
`;
