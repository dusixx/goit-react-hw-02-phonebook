import { Component } from 'react';
import { IconContactsBook, IconSmileSad, IconUserPlus } from 'styles/icons';
import { ContactList } from 'components/ContactList/ContactList';
import { Container, Header, NoContacts, Logo } from './App.styled';
import { Backdrop } from 'components/Backdrop/Backdrop';
import { contacts as initialContacts } from '../../data/contacts';
import { ButtonPrimary, Block } from 'styles/shared';
import { ContactEditor } from 'components/ContactEditor/ContactEditor';
import { Filter } from 'components/ContactList/Filter';
import { getId } from 'components/utils';
import { showError, showSuccess } from 'components/utils/notify';

//
// Constants
//

const EDITOR_TITLE_ADD = 'Add contact';
const EDITOR_TITLE_EDIT = 'Edit contact';
const MSG_NO_CONTACTS = "You don't have any contacts yet";
const ERR_ALREADY_EXISTS = `The contact with the same name or number already exists`;
const MSG_COPIED_SUCCESS = `The contact was copied to the clipboard`;
const MSG_ADDED_SUCCESS = `The contact was added`;
const MSG_DELETED_SUCCESS = `The contact was deleted`;

//
// App
//

export class App extends Component {
  state = {
    showEditor: false,
    editedIndex: -1,
    contacts: initialContacts,
    filter: '',
  };

  componentDidMount() {
    // init
    this.handleListSort(null, 'name', true);
  }

  // e == null при клике на кнопку очистки
  handleFilterChange = (e, { name }) => {
    this.setState({ [name]: e?.target.value || '' });
  };

  filterContacts() {
    const { filter, contacts } = this.state;
    const searchStr = filter.trim().toLocaleLowerCase();

    return searchStr
      ? contacts.filter(
          ({ name, number }) =>
            name.toLocaleLowerCase().includes(searchStr) ||
            number.includes(searchStr)
        )
      : contacts;
  }

  handleControlClick = (id, name) => {
    switch (name) {
      case 'delete':
        return this.handleRemoveContact(id);
      case 'edit':
        return this.handleEditContact(id);
      case 'copy':
        return this.handleCopyContactToClipboard(id);
      default:
    }
  };

  handleRemoveContact(id) {
    this.removeContact(id);
    showSuccess(MSG_DELETED_SUCCESS);
  }

  handleEditContact(id) {
    const idx = this.state.contacts.findIndex(itm => itm.id === id);
    this.editedIndex = idx;
    this.showContactEditor = true;
  }

  async handleCopyContactToClipboard(id) {
    const target = this.state.contacts.find(itm => itm.id === id);

    if (target) {
      // для мобильных устройств вероятно не сработает
      if (navigator.clipboard && isSecureContext) {
        await navigator.clipboard.writeText(JSON.stringify(target));
        showSuccess(MSG_COPIED_SUCCESS);
      } else {
        showError('Access is denied');
      }
    }
  }

  /**
   * Сортирует список контактов по заданному полю
   * @param {*} key - поле (name|number)
   * @param {*} ascending - порядок сортировки
   */
  handleListSort = (_, key, ascending) => {
    this.setState(cur => ({
      contacts: [...cur.contacts].sort(
        ascending
          ? (a, b) => a[key].localeCompare(b[key])
          : (a, b) => b[key].localeCompare(a[key])
      ),
    }));
  };

  set editedIndex(idx) {
    this.setState({ editedIndex: idx });
  }

  set showContactEditor(show) {
    this.setState({ showEditor: show });
  }

  handleAddContactClick = e => {
    this.editedIndex = -1;
    this.showContactEditor = true;
  };

  handleEditorClose = () => {
    this.showContactEditor = false;
  };

  addContact(data) {
    if (this.isContactExists(data)) {
      return showError(ERR_ALREADY_EXISTS);
    }
    this.setState(
      cur => ({
        contacts: [...cur.contacts, { ...data, id: getId() }],
      }),
      () => showSuccess(MSG_ADDED_SUCCESS)
    );

    return true;
  }

  editContact(index, data) {
    this.setState(cur => ({
      contacts: cur.contacts.map((itm, idx) =>
        idx === index ? { ...itm, ...data } : itm
      ),
    }));

    return true;
  }

  toggleContact(id) {
    this.setState(cur => ({
      contacts: cur.contacts.map(itm =>
        itm.id === id ? { ...itm, selected: !itm.selected } : itm
      ),
    }));
  }

  // todo: должен быть синхронизирован со всеми (выделили все)
  // что с состоянием(?)
  toggleAllContacts(checked) {
    this.setState(cur => ({
      contacts: cur.contacts.map(itm => ({ ...itm, selected: checked })),
    }));
  }

  removeContact(id) {
    this.setState({
      contacts: this.state.contacts.filter(itm => itm.id !== id),
    });
  }

  /**
   * Добавляет или изменяет заданный контакт
   * @param {*} data данные полей формы {fieldName: value, ...}
   */
  handleEditorSubmit = (_, data) => {
    const { editedIndex } = this.state;
    let success =
      editedIndex < 0
        ? this.addContact(data)
        : this.editContact(editedIndex, data);
    // закрываем форму только в случае успеха
    // Актуально, если добавление дубликата не удалось
    if (success) this.handleEditorClose();
  };

  /**
   * Закрывает бекдроп при клике на нем
   */
  handleBackdropClick = e => {
    // ловим только на самом бекдропе
    if (e.currentTarget !== e.target) return;
    this.showContactEditor = false;
  };

  /**
   * Вернет массив [name, number] редактируемого контакта
   * Которые впоследствие передаем форме для инициализации полей
   */
  getEditedContactData = () => {
    const { editedIndex, contacts } = this.state;
    if (editedIndex < 0) return;

    const { name, number } = contacts[editedIndex];
    return [name, number];
  };

  /**
   * Проверяет, существует ли контакт с заданным именем/номером
   * @param {*} data - {name, number}
   */
  isContactExists(data) {
    const { name, number } = data;
    return !!this.state.contacts.find(
      itm =>
        itm.name.toLocaleLowerCase() === name.toLocaleLowerCase() ||
        itm.number === number
    );
  }

  handleCheckAll = ({ target: { checked } }) => {
    this.toggleAllContacts(checked);
  };

  handleCheckItem = (_, id) => {
    this.toggleContact(id);
  };

  render() {
    const { contacts, filter, showEditor, editedIndex } = this.state;
    const {
      handleAddContactClick,
      handleFilterChange,
      handleControlClick,
      handleListSort,
      handleEditorClose,
      handleEditorSubmit,
      getEditedContactData,
      handleBackdropClick,
      handleCheckAll,
      handleCheckItem,
    } = this;

    return (
      <Container>
        <Backdrop hidden={!showEditor} onClick={handleBackdropClick}>
          {showEditor && (
            <ContactEditor
              title={editedIndex < 0 ? EDITOR_TITLE_ADD : EDITOR_TITLE_EDIT}
              onClose={handleEditorClose}
              onSubmit={handleEditorSubmit}
              fieldValues={getEditedContactData()}
              autoComplete="off"
            />
          )}
        </Backdrop>

        <Header>
          <Logo>
            <IconContactsBook size={22} color="var(--color-accent)" />
            PhoneBook
          </Logo>
          <ButtonPrimary
            type="button"
            name="addContact"
            onClick={handleAddContactClick}
          >
            <IconUserPlus size={20} />
            Add
          </ButtonPrimary>
        </Header>

        <Block marginBottom="20px" marginTop="15px">
          <Filter
            value={filter}
            onChange={handleFilterChange}
            disabled={!contacts.length}
          />
        </Block>

        {!!contacts.length && (
          <Block maxHeight="70vh">
            <ContactList
              value={this.filterContacts()}
              itemHeight="50px"
              controlsHeight="20px"
              onControlClick={handleControlClick}
              onListSort={handleListSort}
              onCheckAll={handleCheckAll}
              onCheckItem={handleCheckItem}
            />
          </Block>
        )}

        {!contacts.length && (
          <NoContacts>
            {MSG_NO_CONTACTS}
            <IconSmileSad size={20} />
          </NoContacts>
        )}
      </Container>
    );
  }
}
