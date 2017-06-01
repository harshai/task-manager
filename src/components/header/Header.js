import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ addProject, total }) => {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const title = ev.target.addProjectInput.value.trim();
    title && addProject({
      title,
      // Lazy persons's unique ID
      projectID: `project-${Date.now()}`,
    });
    // Clear input after adding the project
    ev.target.addProjectInput.value = '';
  }
  return <header className="header">
    <form className="form" onSubmit={handleSubmit}>
      <label
        htmlFor="add-project-input"
        className="form__label">Add a new project</label>
      <input
        type="input"
        placeholder="eg. Project Manhattan"
        className="form__input"
        id="add-project-input"
        name="addProjectInput"
        autoFocus />
      <button
        type="submit"
        className="form__button">Add</button>
    </form>
    <span className="header__total">Total Projects: <em>{total}</em></span>
  </header>
};

Header.propTypes = {
  addProject: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

export default Header;
