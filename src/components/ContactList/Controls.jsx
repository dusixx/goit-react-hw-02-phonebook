import PropTypes from 'prop-types';
import { getId } from 'components/utils';
import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md';
import { Container, Button } from './Controls.styled';

const data = {
  edit: MdOutlineEdit,
  remove: MdDeleteOutline,
};

export const Control = ({
  icon: ReactIcon,
  size,
  name,
  title,
  onClick,
  targetId,
}) => (
  <Button
    type="button"
    onClick={() => onClick(targetId, name)}
    name={name}
    title={title}
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
        title={name}
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
