import PropTypes from 'prop-types';
import { Component } from 'react';
import { TableHeader, HeaderControls, DeleteBtn } from './ListHeader.styled';
import { HeaderCaption } from './HeaderCaption';

//
// List header
//

export class ListHeader extends Component {
  static propTypes = {
    onListSort: PropTypes.func,
    onCheckAll: PropTypes.func,
    onSelectedDelete: PropTypes.func,
    itemHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  state = {
    sort: {
      name: true,
      number: null,
    },
  };

  getSelectedCount(items) {
    // NOTE: повторный перебор массива (1-ый - map в ContactList)
    // взять бы как-то оттуда кол-во selected
    return items.reduce((res, { selected = false }) => {
      res += Number(selected);
      return res;
    }, 0);
  }

  handleListSort = (e, key) => {
    const { onListSort } = this.props;

    const activateHeaderBtn = name =>
      Object.entries(this.state.sort).reduce((res, [key, value]) => {
        res[key] = key === name ? !value : null;
        return res;
      }, {});

    // убираем иконку сортировки с остальных
    // Без колбека (*) получим старое значение
    this.setState(
      { sort: activateHeaderBtn(key) },
      () => onListSort && onListSort(e, key, this.state.sort[key]) // (*)
    );
  };

  // TODO: убирать маркер сортировки при потере фокуса хедером
  // handleBlur = e => {
  //   this.setState(cur => ({ sort: { name: null, number: null } }));
  // };

  render() {
    const { itemHeight, onCheckAll, onSelectedDelete, items } = this.props;
    const { name, number } = this.state.sort;

    const selectedCount = this.getSelectedCount(items);
    const selectedAll = selectedCount && selectedCount === items.length;

    return (
      <TableHeader itemHeight={itemHeight}>
        <tr /* onBlur={this.handleBlur} */>
          <th>
            <input
              type="checkbox"
              onChange={onCheckAll}
              checked={selectedAll}
            />
          </th>
          <th>
            <HeaderCaption
              name="name"
              sorted={name}
              // кидаем имя, чтобы при клике на иконку key был валиден
              // Иначе, e.target.name === undefined
              onClick={e => this.handleListSort(e, 'name')}
            />
          </th>
          <th>
            <HeaderCaption
              name="number"
              sorted={number}
              onClick={e => this.handleListSort(e, 'number')}
            />
          </th>
          <th>
            <HeaderControls>
              <DeleteBtn
                type="button"
                title="Delete selected"
                disabled={!selectedCount}
                onClick={onSelectedDelete}
              >
                Delete
              </DeleteBtn>
            </HeaderControls>
          </th>
        </tr>
      </TableHeader>
    );
  }
}
