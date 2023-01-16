import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export class App extends Component {
  static #LOCAL_STORAGE = 'phonebook-local-storage-key';

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorageJSON = localStorage.getItem(App.#LOCAL_STORAGE);
    if (localStorageJSON) {
      this.setState({ contacts: JSON.parse(localStorageJSON) });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        App.#LOCAL_STORAGE,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handler = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === name)) {
      alert(name + ' is already in contacts');
      return;
    }
    this.setState({
      contacts: [...contacts, { name: name, number: number, id: nanoid() }],
    });
  };

  filterHandler = filter => {
    this.setState({ filter });
  };

  deleteHandler = id => {
    const { contacts } = this.state;
    this.setState({
      contacts: [...contacts.filter(contact => contact.id !== id)],
    });
  };

  getContacts = () => {
    return this.state.contacts.filter(
      ({ name }) =>
        !this.state.filter ||
        name.toLowerCase().startsWith(this.state.filter.toLowerCase())
    );
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactForm handler={this.handler} />
        </Section>
        <Section title="Contacts">
          <Filter filterHandler={this.filterHandler} />
          <ContactList
            contacts={this.getContacts()}
            deleteHandler={this.deleteHandler}
          />
        </Section>
      </>
    );
  }
}
