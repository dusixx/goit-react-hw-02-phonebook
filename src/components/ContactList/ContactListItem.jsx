import { TableRow } from './ContactListItem.styled';
import { Controls } from './ContactListItem.styled';

const DEF_CONTACT_NAME = '(noname)';

export const ContactListItem = ({
  name = DEF_CONTACT_NAME,
  number,
  itemHeight,
  ...restProps
}) => {
  return (
    <TableRow itemHeight={itemHeight}>
      <td>
        <input type="checkbox" />
      </td>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <Controls {...restProps} />
      </td>
    </TableRow>
  );
};
