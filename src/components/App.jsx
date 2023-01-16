import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export const App = () => {
  const LOCAL_STORAGE = 'phonebook-local-storage-key';

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  
  useEffect(() => {
    const localStorageJSON = localStorage.getItem(LOCAL_STORAGE);
    if (!localStorageJSON) {
      return;
    }
    setContacts([...JSON.parse(localStorageJSON)]);
  }, []);
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(contacts));
  }, [contacts]);

  const handler = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(name + ' is already in contacts');
      return;
    }
    setContacts([...contacts, { name: name, number: number, id: nanoid() }]);
  };

  const filterHandler = filter => {
    setFilter(filter);
  };

  const deleteHandler = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getContacts = () => {
    return contacts.filter(
      ({ name }) =>
        !filter || name.toLowerCase().startsWith(filter.toLowerCase())
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm handler={handler} />
      </Section>
      <Section title="Contacts">
        <Filter filterHandler={filterHandler} />
        <ContactList
          contacts={getContacts()}
          deleteHandler={deleteHandler}
        />
      </Section>
    </>
  );
};
