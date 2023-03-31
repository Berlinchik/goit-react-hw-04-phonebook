import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.scss';
import PropTypes from 'prop-types';

const ContactForm = ({ onSubmitForm }) => {
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    const { value, name } = event.currentTarget;
    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmitForm({ id: nanoid(), userName: userName, number: number });

    setUserName('');
    setNumber('');
  };

  const nameId = nanoid();
  const numId = nanoid();

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label} htmlFor={nameId}>
        Name
        <input
          className={s.input}
          id={nameId}
          type="text"
          name="userName"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={userName}
          onChange={handleInputChange}
        />
      </label>
      <label className={s.label} htmlFor={numId}>
        Number
        <input
          className={s.input}
          id={numId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
        />
      </label>
      <button className={s.btn}>Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default ContactForm;
