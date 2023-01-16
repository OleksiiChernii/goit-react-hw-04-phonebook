import PropTypes from 'prop-types';

export function ContactItem({ id, name, number, deleteHandler }) {
  return (
    <li>
      {name}: {number}{' '}
      <button type="button" onClick={() => deleteHandler(id)}>
        delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};
