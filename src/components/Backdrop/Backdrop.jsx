import styled from '@emotion/styled';

const def = {
  bgColor: 'rgb(0 0 0 / 0.5)',
  zindex: 9999,
};

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ bgColor }) => bgColor || def.bgColor};
  z-index: ${def.zindex};
  opacity: 1;

  visibility: visible;
  overflow: auto;

  transition-property: opacity, visibility;
  transition-timing-function: var(--trans-func);
  transition-duration: var(--trans-duration);

  &[data-hidden='true'] {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;

export const Backdrop = ({ children, hidden, onClick }) => (
  <Container data-hidden={hidden} onClick={onClick}>
    {children}
  </Container>
);
