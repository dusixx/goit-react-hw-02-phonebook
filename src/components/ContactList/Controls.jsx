import PropTypes from 'prop-types';
import { getId, cap } from 'components/utils';
import { Container, Button } from './Controls.styled';

import {
  MdOutlineEdit as IconEdit,
  MdDeleteOutline as IconDelete,
  MdCopyAll as IconCopy,
} from 'react-icons/md';

// порядок контролов слева-направо
// можно расширить, например, copy: {icon, size, ....}
const data = {
  copy: IconCopy,
  edit: IconEdit,
  delete: IconDelete,
};

export const Control = ({ icon: ReactIcon, size, name, onClick, targetId }) => (
  <Button
    type="button"
    onClick={() => onClick(targetId, name)}
    name={name}
    title={cap(name)}
  >
    <ReactIcon size={size || '100%'} />
  </Button>
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
