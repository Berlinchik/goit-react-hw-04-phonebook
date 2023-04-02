import s from './ContactList.module.scss';
import PropTypes from 'prop-types';

const ContactList = ({ items, onDelete }) => {
  return items.length > 0 ? (
    <ul className={s.list}>
      {items.map(({ userName, number, id }) => (
        <li key={id} className={s.item}>
          {userName}: {number}
          <button onClick={e => onDelete(id)} className={s.btn}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className={s.text}>You don't have contacts</p>
  );
};

export default ContactList;
ContactList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
