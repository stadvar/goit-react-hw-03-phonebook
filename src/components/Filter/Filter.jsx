import PropTypes from 'prop-types';
const Filter = ({ value, onFilter }) => {
  return (
    <label>
      <input type="text" name="filter" value={value} onChange={onFilter} />
    </label>
  );
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};
export default Filter;
