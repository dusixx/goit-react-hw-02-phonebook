import PropTypes from 'prop-types';
import { Container, Title } from './Task.styled';

export default function Task({ title, children }) {
  return (
    <Container>
      <Title>{title && title.replace('-', '—')}</Title>
      {children}
    </Container>
  );
}

Task.propType = {
  title: PropTypes.string.isRequired,
};
