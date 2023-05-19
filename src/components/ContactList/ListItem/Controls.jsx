import PropTypes from 'prop-types';
import { getId, cap } from 'components/utils';
import { Container, ControlBtn } from './Controls.styled';
import { IconCopy, IconDelete, IconEdit } from 'styles/icons';

// порядок контролов слева-направо
// можно расширить, например, copy: {icon, size, ....}
const data = {
  copy: IconCopy,
  edit: IconEdit,
  delete: IconDelete,
};

const Control = ({ icon: ReactIcon, size, name, onClick, targetId }) => (
  <ControlBtn
    type="button"
    onClick={() => onClick(targetId, name)}
    name={name}
    title={cap(name)}
  >
    <ReactIcon size={size || '100%'} />
  </ControlBtn>
);

export const Controls = ({ controlsHeight, onControlClick, id }) => (
  <Container height={controlsHeight}>
    {Object.entries(data).map(([name, icon]) => (
      <Control
        key={getId()}
        name={name}
        icon={icon}
        targetId={id}
        onClick={onControlClick}
      />
    ))}
  </Container>
);

Control.propTypes = {
  icon: PropTypes.func.isRequired,
  title: PropTypes.string,
};
