import styled from '@emotion/styled';
import { ButtonBase } from 'styles/shared';

// params

const FIELD_HEIGHT_PX = 40;
const ICON_SIZE = FIELD_HEIGHT_PX * 0.5;
const CLEAR_INPUT_SIZE = FIELD_HEIGHT_PX * 0.5;
const ICON_OFFSET = FIELD_HEIGHT_PX * 0.3;
const FIELD_PADDING_LEFT = ICON_SIZE + ICON_OFFSET + 7;
const FIELD_PADDING_RIGHT = CLEAR_INPUT_SIZE + ICON_OFFSET + 7;
const ICON_COLOR = '#363636';

// styles

export const Label = styled.label`
  display: block;
  /* margin-top: 10px; */

  width: ${({ width }) => width || '100%'};
  height: ${FIELD_HEIGHT_PX}px;
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  height: 100%;
  width: 100%;
  color: ${ICON_COLOR};

  /* &:focus-within {
    color: var(--color-accent);
  } */
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;

  padding: 0;
  padding-left: ${FIELD_PADDING_LEFT}px;
  padding-right: ${FIELD_PADDING_RIGHT}px;

  font-family: inherit;
  font-size: inherit;

  background-color: white;
  /* border-radius: ${FIELD_HEIGHT_PX * 0.25}px; */
  border: 1px solid transparent;
  outline: none;

  transition-property: background-color;

  &:focus-visible {
    background-color: #ebf2ff;
    /* box-shadow: var(--box-shadow); */
    /* border-bottom: 1px solid var(--color-accent); */
  }

  /* border: 1px solid gray; */
`;

export const IconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: ${ICON_OFFSET}px;

  display: flex;
  align-items: center;
  justify-content: center;
  height: ${ICON_SIZE}px;

  color: currentColor;
  transform: translateY(-50%);
`;

export const ClearInputBtn = styled(ButtonBase)`
  position: absolute;
  top: 50%;
  right: ${ICON_OFFSET}px;

  height: ${CLEAR_INPUT_SIZE}px;
  color: gray;

  transform: translateY(-50%);
  transition-property: color;

  &:focus-visible,
  &:hover {
    color: var(--color-black);
  }
`;
