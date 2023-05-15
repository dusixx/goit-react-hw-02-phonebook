import PropTypes from 'prop-types';
import { Component } from 'react';
import { TableHeader, HeaderControls, DeleteBtn } from './ListHeader.styled';
import { HeaderBtn } from './HeaderBtn';

//
// List header
//

export class ListHeader extends Component {
  static propTypes = {
    onListSort: PropTypes.func,
    itemHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  state = {
    sort: {
      name: true,
      number: null,
    },
  };

  activateHeaderBtn = name =>
    Object.entries(this.state.sort).reduce((res, [key, value]) => {
      res[key] = key === name ? !value : null;
      return res;
    }, {});

  handleListSort = (e, key) => {
    const { onListSort } = this.props;

    // убираем иконку сортировки с остальных
    // Без колбека (*) получим старое значение
    this.setState(
      { sort: this.activateHeaderBtn(key) },
      () => onListSort && onListSort(e, key, this.state.sort[key]) // (*)
    );
  };

  // handleBlur = e => {
  //   this.setState(cur => ({ sort: { name: null, number: null } }));
  // };

  render() {
    return (
      <TableHeader itemHeight={this.props.itemHeight}>
        <tr onBlur={this.handleBlur}>
          <th>
            <input type="checkbox" />
          </th>
          <th>
            <HeaderBtn
              name="name"
              sorted={this.state.sort['name']}
              // кидаем имя, чтобы при клике на иконку key был валиден
              // Иначе, e.target.name === undefined
              onClick={e => this.handleListSort(e, 'name')}
            />
          </th>
          <th>
            <HeaderBtn
              name="number"
              sorted={this.state.sort['number']}
              onClick={e => this.handleListSort(e, 'number')}
            />
          </th>
          <th>
            <HeaderControls>
              <DeleteBtn type="button" title="Remove selected">
                Delete
              </DeleteBtn>
            </HeaderControls>
          </th>
        </tr>
      </TableHeader>
    );
  }
}
