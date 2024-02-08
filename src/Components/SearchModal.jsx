import React, { useState } from 'react';
import '../CompStyles/SearchModal.css'; // Import your CSS file for styling

const SearchModal = ({ closeModal, onSelectUserName }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let searchType = '';
      if (searchInput.length === 12) {
        searchType = 'groupUid';
      } else if (searchInput.length === 16) {
        searchType = 'uid';
      } else if (searchInput.includes(' ')) {
        searchType = 'user';
      }else if (searchInput.includes('@')) {
        searchType = 'email';
      }
       else {
        searchType = 'group';
      }
      console.log('Search Type:', searchType);

      let url = '';
      if (searchType === 'groupUid') {
        url = `http://localhost:3001/api/findGroupNameByIdOrName?groupId=${searchInput}`;
      } else if (searchType === 'uid') {
        url = `http://localhost:3001/api/findNameByUid/${searchInput}`;
      } else if (searchType === 'user') {
        url = `http://localhost:3001/api/findNameByUid/${searchInput}`;
      }
      else if (searchType === 'email') {
        url = `http://localhost:3001/api/findNameByUid/${searchInput}`;
      } 
      
      else {
        url = `http://localhost:3001/api/findGroupNameByIdOrName?name=${searchInput}`;
      }
      console.log('API URL:', url);

      const response = await fetch(url);
      console.log('Fetch Response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Riju:', data);
        if (data.groupName) {
          setSearchResults([data.groupName]);
        }
        else if(data.name){
          setSearchResults([data.name]);
        }  
        else {
          setSearchResults(['No user or group found']); // Or handle the case where no user or group is found
        }
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching:', error);
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
        <h2>Search Users or Groups</h2>
        <form onSubmit={handleSearch}>
          <label htmlFor="searchInput">Enter UID, Name, or Group Name:</label>
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
