import { string, func, bool } from 'prop-types';
import { IconSortAz, IconSortZa } from 'styles/icons';
import { Button } from './HeaderCaption.styled';

const ICON_SIZE = 14;

export const HeaderCaption = ({ name, onClick, sorted, ...restProps }) => {
  // asc(true), desc(false), none(null)
  const Icon = sorted != null ? (sorted ? IconSortAz : IconSortZa) : null;

  return (
    <Button type="button" name={name} onClick={onClick} {...restProps}>
      <span>{name}</span>
      {Icon && <Icon size={ICON_SIZE} color="var(--color-accent)" />}
    </Button>
  );
};

HeaderCaption.propTypes = {
  name: string.isRequired,
  onClick: func,
  sorted: bool,
};
