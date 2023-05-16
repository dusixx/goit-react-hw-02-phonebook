import { Component } from 'react';
import { IconContactsBook, IconSmileSad, IconUserPlus } from 'styles/icons';
import { ContactList } from 'components/ContactList/ContactList';
import { Container, Header, NoContacts } from './App.styled';
import { Backdrop } from 'components/Backdrop/Backdrop';
import { contacts as initialContacts } from '../../data/contacts';
import { ButtonPrimary, Block } from 'styles/shared';
import { ContactEditor } from 'components/ContactEditor/ContactEditor';
import { Filter } from 'components/ContactList/Filter';
import { getId } from 'components/utils';

const EDITOR_TITLE_ADD = 'Add contact';
const EDITOR_TITLE_EDIT = 'Edit contact';
const MSG_NO_CONTACTS = "You don't have any contacts yet";

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
        return this.handleCopyContact(id);
      default:
    }
  };

  handleRemoveContact(id) {
    this.setState({
      contacts: this.state.contacts.filter(itm => itm.id !== id),
    });
  }

  handleEditContact(id) {
    const idx = this.state.contacts.findIndex(itm => itm.id === id);
    this.setState({ editedIndex: idx, showEditor: true });
  }

  handleCopyContact(id) {
    const target = this.state.contacts.find(itm => itm.id === id);
    target && navigator.clipboard.writeText(JSON.stringify(target));
  }

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
    this.setState({ showEditor: true, editedIndex: -1 });
  };

  handleEditorClose = e => {
    this.setState({ showEditor: false });
  };

  addContact(data) {
    this.setState(cur => ({
      contacts: [...cur.contacts, { ...data, id: getId() }],
    }));
  }

  editContact(index, data) {
    this.setState(cur => ({
      contacts: cur.contacts.map((itm, idx) =>
        idx === index ? { ...itm, ...data } : itm
      ),
    }));
  }

  handleEditorSubmit = (_, data) => {
    const { editedIndex } = this.state;

    if (editedIndex < 0) this.addContact(data);
    else this.editContact(editedIndex, data);

    this.handleEditorClose();
  };

  handleBackdropClick = e => {
    // ловим только на самом бекдропе
    if (e.currentTarget !== e.target) return;
    this.setState({ showEditor: false });
  };

  getFieldValues = () => {
    const { editedIndex, contacts } = this.state;
    if (editedIndex < 0) return;

    const { name, number } = contacts[editedIndex];
    return [name, number];
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
      getFieldValues,
      handleBackdropClick,
    } = this;

    return (
      <Container>
        <Backdrop hidden={!showEditor} onClick={handleBackdropClick}>
          {showEditor && (
            <ContactEditor
              width={500}
              title={editedIndex < 0 ? EDITOR_TITLE_ADD : EDITOR_TITLE_EDIT}
              onClose={handleEditorClose}
              onSubmit={handleEditorSubmit}
              fieldValues={getFieldValues()}
              autoComplete="off"
            />
          )}
        </Backdrop>

        <Header>
          <h1>
            <IconContactsBook size={22} color="var(--color-accent)" />
            PhoneBook
          </h1>
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
          <Block>
            <ContactList
              value={this.filterContacts()}
              itemHeight="50px"
              controlsHeight="20px"
              onControlClick={handleControlClick}
              onListSort={handleListSort}
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
