import PropTypes from 'prop-types';
import { Container, Title } from './Task.styled';

export const Task = ({ title, children }) => (
  <Container>
    <Title>{title.replace('-', '—')}</Title>
    {children}
  </Container>
);

Task.propType = {
  title: PropTypes.string.isRequired,
};
