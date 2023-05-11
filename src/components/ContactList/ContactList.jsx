import PropTypes from 'prop-types';
import { ContactListItem } from './ContactListItem';
import { ListHeader } from './ListHeader';
import { Table } from './ContactList.styled';

export const ContactList = ({ value = [], width, sort, ...restProps }) => {
  return (
    <Table width={width}>
      <ListHeader {...restProps} />
      <tbody>
        {value.map(({ id, name, number }) => (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            {...restProps}
          />
        ))}
      </tbody>
    </Table>
  );
};

ContactList.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
