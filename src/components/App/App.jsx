import { Component } from 'react';
import { ContactEditor } from 'components/ContactEditor';
import { Filter } from 'components/Filter';
import { Backdrop } from 'components/Backdrop';
import { ContactList } from 'components/ContactList';
import { getId, showError, showSuccess } from 'components/utils';
import { contacts as initialContacts } from '../../data/contacts';
import { Container, Header, NoContacts, Logo, ButtonGroup } from './App.styled';
import { ButtonPrimary, Block, ButtonSecondary } from 'styles/shared';
import {
  IconContactsBook,
  IconSmileSad,
  IconUserPlus,
  IconRefresh,
} from 'styles/icons';

//
// Constants
//

const EDITOR_TITLE_ADD = `Add contact`;
const EDITOR_TITLE_EDIT = `Edit contact`;
const MSG_NO_CONTACTS = `You don't have any contacts yet`;
const MSG_COPIED_SUCCESS = `The contact was copied to the clipboard`;
const MSG_ADDED_SUCCESS = `The contact was added successfully`;
const ERR_ALREADY_EXISTS = `The contact with the same name or number already exists`;
const ERR_ACCESS_DENIED = `You do not have permission to perform this operation`;

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
    this.handleListSort(null, 'name', true);
  }

  set editedIndex(idx) {
    this.setState({ editedIndex: idx });
  }

  set showContactEditor(show) {
    this.setState({ showEditor: show });
  }

  //
  // Helpers
  //

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const searchStr = filter.trim().toLocaleLowerCase();

    return searchStr
      ? contacts.filter(
          ({ name, number }) =>
            name.toLocaleLowerCase().includes(searchStr) ||
            number.includes(searchStr)
        )
      : contacts;
  };

  // TODO: возможно лучше добавить свойство filtered каждому контакту
  // и упростить (*) и (**). А при фильтрации
  // ставить selected: false для контактов, у которых filtered: false

  toggleFiltered(checked) {
    const filteredContacts = this.getFilteredContacts(); // (*)

    this.setState(cur => ({
      contacts: cur.contacts.map(itm => {
        const filtered = filteredContacts.find(({ id }) => itm.id === id);
        return { ...itm, selected: filtered && checked };
      }),
    }));
  }

  deleteSelectedInFiltered() {
    const filteredContacts = this.getFilteredContacts(); // (**)

    this.setState(cur => ({
      contacts: cur.contacts.filter(itm => {
        const filtered = filteredContacts.find(({ id }) => itm.id === id);
        return !filtered || !itm.selected;
      }),
    }));
  }

  addContact(data) {
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

  deleteContact(id) {
    this.setState({
      contacts: this.state.contacts.filter(itm => itm.id !== id),
    });
  }

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

  formatNumber(number) {
    return number
      .replace(/[\s-]/g, '')
      .replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
  }

  //
  // Handlers
  //

  handleFilterChange = (e, { name }) => {
    // (e === null) при клике на кнопку очистки
    this.setState({ [name]: e?.target.value || '' });
  };

  handleItemControlClick = (id, name) => {
    switch (name) {
      case 'delete':
        return this.handleDeleteContact(id);
      case 'edit':
        return this.handleEditContact(id);
      case 'copy':
        return this.handleCopyContactToClipboard(id);
      default:
    }
  };

  handleDeleteContact(id) {
    this.deleteContact(id);
  }

  handleEditContact(id) {
    const idx = this.state.contacts.findIndex(itm => itm.id === id);
    this.editedIndex = idx;
    this.showContactEditor = true;
  }

  async handleCopyContactToClipboard(id) {
    const target = this.state.contacts.find(itm => itm.id === id);

    if (target) {
      // NOTE: для мобильных устройств не работает
      if (navigator.clipboard && isSecureContext) {
        await navigator.clipboard.writeText(JSON.stringify(target));
        showSuccess(MSG_COPIED_SUCCESS);
      } else {
        showError(ERR_ACCESS_DENIED);
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

  handleAddContactClick = e => {
    this.editedIndex = -1;
    this.showContactEditor = true;
  };

  handleEditorClose = () => {
    this.showContactEditor = false;
  };

  handleDeleteSelected = () => {
    this.deleteSelectedInFiltered();
  };

  /**
   * Добавляет или изменяет заданный контакт
   * @param {*} data данные полей формы {fieldName: value, ...}
   */
  handleEditorSubmit = (_, { name, number }) => {
    const { editedIndex } = this.state;
    const data = { name, number: this.formatNumber(number) };

    if (editedIndex < 0 && this.isContactExists(data)) {
      return showError(ERR_ALREADY_EXISTS);
    }

    let success =
      editedIndex < 0
        ? this.addContact(data)
        : this.editContact(editedIndex, data);
    // закрываем форму только в случае успеха
    // Актуально, если добавление дубликата не удалось
    this.showContactEditor = !success;
  };

  handleBackdropClick = e => {
    // ловим только на самом бекдропе
    if (e.currentTarget !== e.target) return;
    this.showContactEditor = false;
  };

  handleCheckAll = ({ target: { checked } }) => {
    this.toggleFiltered(checked);
  };

  handleItemCheck = (e, id) => {
    this.toggleContact(id);
  };

  handleResetClick = () => {
    this.setState({ contacts: initialContacts });
    this.handleListSort(null, 'name', true);
  };

  render() {
    const { contacts, filter, showEditor, editedIndex } = this.state;
    const {
      getEditedContactData,
      getFilteredContacts,
      handleAddContactClick,
      handleFilterChange,
      handleItemControlClick,
      handleListSort,
      handleEditorClose,
      handleEditorSubmit,
      handleBackdropClick,
      handleCheckAll,
      handleItemCheck,
      handleDeleteSelected,
      handleResetClick,
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
          <ButtonGroup>
            <ButtonPrimary
              type="button"
              title="Add contact"
              onClick={handleAddContactClick}
            >
              <IconUserPlus size={20} />
              Add
            </ButtonPrimary>
            <ButtonSecondary title="Reset" onClick={handleResetClick}>
              <IconRefresh size={20} />
            </ButtonSecondary>
          </ButtonGroup>
        </Header>

        <Block marginBottom={20} marginTop={15}>
          <Filter
            value={filter}
            onChange={handleFilterChange}
            disabled={!contacts.length}
          />
        </Block>

        {!!contacts.length && (
          <Block maxHeight="70vh">
            <ContactList
              value={getFilteredContacts()}
              itemHeight={50}
              controlsHeight={20}
              onControlClick={handleItemControlClick}
              onListSort={handleListSort}
              onCheckAll={handleCheckAll}
              onItemCheck={handleItemCheck}
              onSelectedDelete={handleDeleteSelected}
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
