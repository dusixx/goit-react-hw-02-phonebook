// import Task from '../Task/Task';
// import { Container } from './App.styled';
import { Component } from 'react';
import Filter from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    return (
      <Filter
        value={this.state.filter}
        onChange={this.handleFilterChange}
        width="20%"
      />
    );
  }
}
