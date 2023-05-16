import PropTypes from 'prop-types';
import { ContactListItem } from './ContactListItem';
import { ListHeader } from './ListHeader';
import { Table } from './ContactList.styled';

const ListContent = ({ value, ...restProps }) => (
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
);

export const ContactList = ({ value = [], width, sort, ...restProps }) => {
  return (
    <Table width={width}>
      <ListHeader {...restProps} />
      <ListContent value={value} {...restProps} />
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
