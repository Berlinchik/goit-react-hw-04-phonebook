import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.scss';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({ id: nanoid(), ...this.state });

    this.setState({ name: '', number: '' });
  };

  render() {
    const nameId = nanoid();
    const numId = nanoid();
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label className={s.label} htmlFor={nameId}>
          Name
          <input
            className={s.input}
            id={nameId}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleInputChange}
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
            value={this.state.number}
            onChange={this.handleInputChange}
          />
        </label>
        <button className={s.btn}>Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
