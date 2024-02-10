import React, { useState, useEffect } from 'react';
import '../CompStyles/SearchModal.css'; // Import your CSS file for styling
import { useAuth0 } from '@auth0/auth0-react';

const SearchModal = ({ closeModal, onSelectUserName }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currUid, setCurrUid] = useState('');
  const { user } = useAuth0(); // Invoke useAuth0 as a function

  useEffect(() => {
    if (user) {
      // Fetch UID based on email and name once user is authenticated
      fetchUidByEmailAndName(user.email, user.name);
    }
  }, [user]); // Add user as dependency

  const fetchUidByEmailAndName = async (email, name) => {
    try {
      const response = await fetch(`http://localhost:3001/api/checkUidByEmailAndName?email=${email}&name=${name}`);
      if (response.ok) {
        const data = await response.json();
        if (data.uid) {
          setCurrUid(data.uid); // Corrected typo here
          console.log('Overlord actual maintaining flight level 550', data.uid);
        } else {
          console.error('No user found'); // Or handle the case where no user is found
        }
      } else {
        console.error('Failed to fetch UID:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching UID:', error);
    }
  };

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
      } else if (searchInput.includes('@')) {
        searchType = 'email';
      } else {
        searchType = 'group';
      }
      console.log('Search Type:', searchType);

      let url = '';
      if (searchType === 'groupUid') {
        url = `http://localhost:3001/api/findGroupNameByIdOrName?groupId=${searchInput}`;
      } else if (searchType === 'uid' || searchType === 'user' || searchType === 'email') {
        url = `http://localhost:3001/api/findNameByUid/${searchInput}`;
      } else {
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
        } else if (data.name) {
          setSearchResults([data.name]);
        } else {
          setSearchResults(['No user or group found']); // Or handle the case where no user or group is found
        }
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  console.log('Stay Frosty', currUid);

  const handleUploadUser = async (userName) => {
    try {
      const response = await fetch('http://localhost:3001/api/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: currUid,
          name: userName,
          contactId: '5555555555555555',
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Contact added successfully:', result);
        // Optionally, you can handle success here, maybe show a message or update UI
      } else {
        console.error('Failed to add contact:', response.statusText);
        // Optionally, handle failure here, maybe show an error message
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      // Optionally, handle error here, maybe show an error message
    }
  };

  const handleSelectUser = (userName) => {
    onSelectUserName(userName);
    handleUploadUser(userName);
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
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div key={index}>
                <p>{result}</p>
                <button onClick={() => handleSelectUser(result)}>Select</button>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
