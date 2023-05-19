import ScrollToggler from 'components/Backdrop/scrollToggler';
import { Container } from './Backdrop.styled';

const scroll = new ScrollToggler();

export const Backdrop = ({ children, hidden, onClick }) => {
  scroll[hidden ? 'enable' : 'disable']();

  return (
    <Container data-hidden={hidden || null} onClick={onClick}>
      {children}
    </Container>
  );
};
