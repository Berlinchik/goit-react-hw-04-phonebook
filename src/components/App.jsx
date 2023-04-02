import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import s from './APP.module.scss';
import { useState, useEffect, useRef } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const onSubmitHandle = data => {
    const elem = contacts.find(({ userName }) => userName === data.userName);

    if (!elem) {
      setContacts(prevState => {
        return [...prevState, data];
      });
    } else {
      return alert(`${elem.userName} is already in contacts`);
    }
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value.toLowerCase().trim());
  };

  const onDelete = elemId => {
    setContacts(contacts.filter(({ id }) => id !== elemId));
  };

  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts =
    contacts.length > 0
      ? contacts.filter(({ userName }) =>
          userName.toLowerCase().includes(filter)
        )
      : contacts;

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmitForm={onSubmitHandle} />
      <h2 className={s.title}>Contacts</h2>
      <Filter onFilterChange={onFilterChange} />
      <ContactList items={filteredContacts} onDelete={onDelete} />
    </div>
  );
};
