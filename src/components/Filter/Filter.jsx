import { IconSearch } from 'styles/icons';
import { TextField } from 'components/TextField';

export const Filter = props => (
  <TextField
    icon={IconSearch}
    name="filter"
    label="Search"
    autoComplete="off"
    style={{ border: 'unset' }}
    {...props}
  />
);
