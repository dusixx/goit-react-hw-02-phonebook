import { TableRow } from './ContactListItem.styled';
import { Controls } from './Controls';

const DEF_CONTACT_NAME = '(noname)';

export const ContactListItem = ({
  name = DEF_CONTACT_NAME,
  number,
  itemHeight,
  ...restProps
}) => {
  return (
    <TableRow itemHeight={itemHeight}>
      {/* checkbox */}
      <td>
        <div data-checkbox>
          <input type="checkbox" />
        </div>
      </td>
      {/* sortable */}
      <td>{name}</td>
      <td>{number}</td>
      {/* controls */}
      <td data-controls="true">
        <Controls style={{ marginLeft: 'auto' }} {...restProps} />
      </td>
    </TableRow>
  );
};
