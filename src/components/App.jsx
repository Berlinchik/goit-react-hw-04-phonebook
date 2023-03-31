import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import s from './APP.module.scss';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmitHandle = data => {
    const elem = this.state.contacts.find(({ name }) => name === data.name);

    if (!elem) {
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, data] };
      });
    } else {
      return alert(`${elem.name} is already in contacts`);
    }
  };

  onFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onDelete = elemId => {
    this.setState({
      contacts: this.state.contacts.filter(({ id }) => id !== elemId),
    });
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const normalizedFilter = this.state.filter.toLowerCase().trim();
    const filteredContacts = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitHandle} />
        <h2 className={s.title}>Contacts</h2>
        <Filter onFilterChange={this.onFilterChange} />
        <ContactList items={filteredContacts} onDelete={this.onDelete} />
      </div>
    );
  }
}
