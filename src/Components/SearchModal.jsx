import React, { useState } from 'react';
import '../CompStyles/SearchModal.css'; // Import your CSS file for styling

const SearchModal = ({ closeModal, onSelectUserName }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/findNameByUid/${searchInput}`);
      if (response.ok) {
        const data = await response.json();
        if (data.name) {
          setSearchResults([data.name]);
        } else {
          setSearchResults(['No user found']); // Or handle the case where no user is found
        }
      } else {
        console.error('Failed to fetch user:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching for user:', error);
    }
  };

  const handleSelectUser = (userName) => {
    onSelectUserName(userName);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content search-modal">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Search Users</h2>
        <form onSubmit={handleSearch}>
          <label htmlFor="searchInput">Enter UID:</label>
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index}>
              <p>{result}</p>
              <button onClick={() => handleSelectUser(result)}>Select</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
