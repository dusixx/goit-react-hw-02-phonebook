import { TextField } from 'components/etc/TextField';
import { BiSearch } from 'react-icons/bi';

const Filter = props => {
  return (
    <TextField
      icon={BiSearch}
      name="filter"
      label="Search contacts"
      {...props}
    />
  );
};

export default Filter;
