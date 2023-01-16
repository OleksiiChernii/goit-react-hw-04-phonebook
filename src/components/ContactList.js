import PropTypes from 'prop-types';
import { ContactItem } from './ContactItem';

export function ContactList({ contacts, deleteHandler }) {
  return (
    <>
      <ul>
        {contacts.map(({ id, name, number }) => (
          <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            deleteHandler={deleteHandler}
          />
        ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteHandler: PropTypes.func.isRequired,
};
