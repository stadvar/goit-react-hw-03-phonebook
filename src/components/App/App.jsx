// import data from '../../data.json';
import React, { Component } from 'react';
import './App.css';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
const shortid = require('shortid');

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  handleFilter = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };
  handleSubmit = data => {
    const search = this.state.contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase(),
    );
    if (search) {
      alert(`${search.name} is already in contacts.`);
      return;
    }

    const newContact = {
      ...data,
      id: shortid.generate(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  getContactList = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  onDeleteContact = id => {
    this.setState(prevState => {
      const filtered = prevState.contacts.filter(el => el.id !== id);
      return {
        contacts: [...filtered],
      };
    });
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const contactList = this.getContactList();
    const { filter } = this.state;
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <p className="App-find">Find contacts by name</p>
        <Filter value={filter} onFilter={this.handleFilter} />
        <ContactList
          contacts={contactList}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
