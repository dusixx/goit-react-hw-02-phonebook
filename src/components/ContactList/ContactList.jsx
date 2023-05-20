import { string, bool, exact, arrayOf } from 'prop-types';
import { ListItem } from './ListItem';
import { ListHeader } from './ListHeader';
import { Table } from './ContactList.styled';

export const ContactList = ({ value, width, onItemCheck, ...restProps }) => {
  return (
    <Table width={width}>
      <ListHeader items={value} {...restProps} />
      <tbody>
        {value.map(({ id, name, number, selected = false }) => {
          return (
            <ListItem
              key={id}
              id={id}
              name={name}
              number={number}
              checked={selected}
              onChange={e => onItemCheck(e, id)}
              {...restProps}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

ContactList.propTypes = {
  value: arrayOf(
    exact({
      name: string.isRequired,
      id: string.isRequired,
      number: string.isRequired,
      selected: bool,
    })
  ),
};
