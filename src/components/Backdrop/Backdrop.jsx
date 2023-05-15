import styled from '@emotion/styled';

const def = { opacity: 0.5, zindex: 999 };

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ bgColor }) => bgColor || 'black'};
  opacity: ${({ opacity }) => opacity || def.opacity};
  z-index: ${({ zindex }) => zindex || def.zindex};

  visibility: visible;
  overflow: auto;

  transition-property: opacity;
  transition-timing-function: var(--trans-func);
  transition-duration: var(--trans-duration);
`;
