import { BiSearch } from 'react-icons/bi';
import { TextField } from 'components/TextField/TextField';

export const Filter = props => (
  <TextField
    icon={BiSearch}
    name="filter"
    label="Search"
    autoComplete="off"
    style={{ border: 'unset' }}
    {...props}
  />
);
