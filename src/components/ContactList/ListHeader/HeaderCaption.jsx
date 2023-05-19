import PropTypes from 'prop-types';
import { IconSortAz, IconSortZa } from 'styles/icons';
import { Button } from './HeaderCaption.styled';

const ICON_SIZE = 14;

export const HeaderCaption = ({ name, onClick, sorted }) => {
  // asc(true), desc(false), none(null)
  const Icon = sorted != null ? (sorted ? IconSortAz : IconSortZa) : null;

  return (
    <Button type="button" name={name} onClick={onClick}>
      <span>{name}</span>
      {Icon && <Icon size={ICON_SIZE} color="var(--color-accent)" />}
    </Button>
  );
};

HeaderCaption.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  sorted: PropTypes.bool,
};