import { Component } from 'react';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { BiSearch, BiUserPlus } from 'react-icons/bi';
import { Block } from 'styles/shared';
import { ContactList } from 'components/ContactList/ContactList';
import { TextField } from 'components/TextField/TextField';
import { Container, Header } from './App.styled';
import { contacts as initialContacts } from '../../data/contacts';
import { ButtonPrimary } from 'styles/shared';

const Filter = props => (
  <TextField icon={BiSearch} name="filter" label="Search" {...props} />
);

//
// App
//

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  componentDidMount() {
    this.handleListSort(null, 'name', true);
  }

  // e == null при клике на кнопку очистки
  handleFilterChange = e => {
    this.setState({ filter: e?.target.value || '' });
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
    if (name === 'remove') return this.removeContact(id);
    if (name === 'edit') return this.editContact(id);
  };

  removeContact(id) {
    this.setState({
      contacts: this.state.contacts.filter(itm => itm.id !== id),
    });
  }

  editContact(id) {
    return;
  }

  handleListSort = (_, key, asc) => {
    const comp = asc
      ? (a, b) => a[key].localeCompare(b[key])
      : (a, b) => b[key].localeCompare(a[key]);

    this.setState({ contacts: this.state.contacts.sort(comp) });
  };

  render() {
    return (
      <Container width="50%">
        <Header>
          <h1>
            <RiContactsBook2Fill size={22} color="var(--color-accent)" />
            PhoneBook
          </h1>
          <ButtonPrimary type="button" name="addContact">
            <BiUserPlus size={20} />
            Add
          </ButtonPrimary>
        </Header>

        <Block marginBottom="20px" marginTop="15px">
          <Filter
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </Block>

        <Block>
          <ContactList
            value={this.filterContacts()}
            itemHeight="50px"
            controlsHeight="20px"
            onControlClick={this.handleControlClick}
            onListSort={this.handleListSort}
          />
        </Block>
      </Container>
    );
  }
}
