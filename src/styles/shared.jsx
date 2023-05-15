import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { isStr } from 'components/utils';

// Utils

export const FlexCentered = cssProps => css`
  display: flex;
  align-items: center;
  justify-content: center;
  ${isStr(cssProps) ? css(cssProps) : { ...cssProps }}
`;

export const Disabled = css`
  pointer-events: none;
  filter: grayscale(1);
  opacity: 0.4;
`;

// Button

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
  padding-left: ${({ paddingSide }) => paddingSide || '12px'};
  padding-right: ${({ paddingSide }) => paddingSide || '12px'};

  padding-top: 7px;
  padding-bottom: 7px;

  font-size: 14px;
  color: white;

  background-color: var(--color-accent);
  border-radius: var(--border-radius);
  transition-property: filter;

  &:focus-visible,
  &:hover {
    filter: brightness(1.1);
  }
`;

// Misc

export const Block = styled.div`
  ${FlexCentered()}
  /* display: ${({ hidden }) => (hidden ? 'none' : 'flex')}; */

  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height};

  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-top: ${({ marginTop }) => marginTop};

  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  overflow: hidden;
`;
