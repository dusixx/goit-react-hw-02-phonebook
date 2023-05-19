import { TableRow } from './ListItem.styled';
import { Controls } from './Controls';

const DEF_CONTACT_NAME = '(noname)';

export const ListItem = ({
  name = DEF_CONTACT_NAME,
  number,
  itemHeight,
  onChange,
  checked,
  ...restProps
}) => {
  return (
    <TableRow itemHeight={itemHeight}>
      {/* checkbox */}
      <td>
        <div data-checkbox>
          <input type="checkbox" onChange={onChange} checked={checked} />
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
