import PropTypes from 'prop-types';
import { ContactListItem } from './ContactListItem';
import { ListHeader } from './ListHeader';
import { Table } from './ContactList.styled';

const ListContent = ({ items, onCheckItem, ...restProps }) => {
  return (
    <tbody>
      {items.map(({ id, name, number, selected }) => {
        return (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            selected={selected}
            onChange={e => onCheckItem(e, id)}
            {...restProps}
          />
        );
      })}
    </tbody>
  );
};

export const ContactList = ({ value = [], width, sort, ...restProps }) => {
  return (
    <Table width={width}>
      <ListHeader items={value} {...restProps} />
      <ListContent items={value} {...restProps} />
    </Table>
  );
};

ContactList.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    })
  ),
};
