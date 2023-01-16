import PropTypes from 'prop-types';

export function Filter({ filterHandler }) {
  return (
    <>
      <p>Filnd contact by name</p>
      <input
        type="text"
        name="filter"
        onInput={e => filterHandler(e.target.value)}
      />
    </>
  );
}

Filter.propTypes = {
  filterHandler: PropTypes.func.isRequired,
};
