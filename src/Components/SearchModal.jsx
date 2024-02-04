import React from 'react';
import "../CompStyles/SearchModal.css" // Import your CSS file for styling
import "../CompStyles/SearchModal.css"

const SearchModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content search-modal">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Search Users</h2>
        {/* Add your modal content here */}
        <form>
          <label htmlFor="searchInput">Enter username:</label>
          <input type="text" id="searchInput" name="searchInput" />
          <button type="submit">Search</button>
        </form>
        {/* Display search results or other content based on your needs */}
        <div className="search-results">
          <p>Result 1</p>
          <p>Result 2</p>
          {/* Add more result items as needed */}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
