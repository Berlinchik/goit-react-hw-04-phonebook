import s from './Filter.module.scss';
import PropTypes from 'prop-types';

const Filter = ({ onFilterChange }) => {
  return (
    <input className={s.input} type="text" onChange={e => onFilterChange(e)} />
  );
};

export default Filter;
Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
