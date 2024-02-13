import React, { useState, useEffect } from 'react';
import '../CompStyles/SearchModal.css'; // Import your CSS file for styling
import { useAuth0 } from '@auth0/auth0-react';

const SearchModal = ({ closeModal, onSelectUserName}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currUid, setCurrUid] = useState('');
  const { user } = useAuth0();
  const [isUid, setIsUid] = useState(false);
  const [uidInput, setUidInput] = useState('');
  const [uidgrpInput, setUidgrpInput] = useState('');
  const [isInputUid, setIsInputUid] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [grpFlag, setGrpFlag] = useState(false);
  const [finalUid,setFinalUid] = useState('');

  useEffect(() => {
    if (user) {
      fetchUidByEmailAndName(user.email, user.name);
    }
  }, [user]);

  const fetchUidByEmailAndName = async (email, name) => {
    try {
      const response = await fetch(`http://localhost:3001/api/checkUidByEmailAndName?email=${email}&name=${name}`);
      if (response.ok) {
        const data = await response.json();
        if (data.uid) {
          setCurrUid(data.uid);
        } else {
          console.error('No user found');
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
      if (/\d/.test(searchInput)) {
        if (searchInput.length === 12) {
          searchType = 'groupUid';
          setIsUid(true);
        } else if (searchInput.length === 16) {
          searchType = 'uid';
          setIsUid(true);
        }
      } else if (searchInput.includes(' ')) {
        searchType = 'user';
      } else if (searchInput.includes('@')) {
        searchType = 'email';
      } else {
        searchType = 'group';
      }

      let url = '';
      if (searchType === 'groupUid') {
        url = `http://localhost:3001/api/findGroupNameByIdOrName?groupId=${searchInput}`;
      } else if (searchType === 'uid' || searchType === 'user' || searchType === 'email') {
        url = `http://localhost:3001/api/findNameByUid/${searchInput}`;
      } else if (searchType === 'group') {
        url = `http://localhost:3001/api/findGroupNameByIdOrName?name=${searchInput}`;
      }

      if (searchType === 'groupUid') {
        setUidgrpInput(searchInput);
        setFinalUid(searchInput);
        setGrpFlag(true);
      } else if (searchType === 'uid') {
        setUidInput(searchInput);
        setFinalUid(searchInput);
      }

      const response = await fetch(url);
      if (response.ok) {
        setSearchPerformed(true);
        const data = await response.json();
        if (searchType === 'uid' || searchType === 'groupUid') {
          setIsInputUid(true);
        }
        if (data.groupName) {
          setSearchResults([data.groupName]);
        } else if (data.name) {
          setSearchResults([data.name]);
        } else {
          setSearchResults(['No user or group found']);
        }
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const uploadUserContact = async (userName) => {
    try {
      const contactResponse = await fetch('http://localhost:3001/api/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: currUid,
          name: userName,
          contactId: uidInput,
        }),
      });
  
      if (contactResponse.ok) {
        const contactResult = await contactResponse.json();
        console.log('Contact added successfully:', contactResult);
        return true;
      } else {
        console.error('Failed to add contact:', contactResponse.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error uploading user contact:', error);
      return false;
    }
  };
  
  const uploadUserToGroup = async (userName) => {
    try {
      console.log('User UID Soemthing :', currUid);
      console.log('User Name Something:', userName);
      console.log('Group UID Something:', uidgrpInput);
  
      const groupResponse = await fetch('http://localhost:3001/api/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: currUid,
          name: userName,
          contactId: uidgrpInput,
        }),
      });
  
      if (groupResponse.ok) {
        const groupResult = await groupResponse.json();
        console.log('User added to group successfully:', groupResult);
        return true;
      } else {
        console.error('Failed to add user to group:', groupResponse.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error uploading user to group:', error);
      return false;
    }
  };
  
  
  const handleUid = async (e) => {
    e.preventDefault();
    let response;
    if (uidInput.length === 12 || uidInput.length === 16) {
      setFinalUid(uidInput);
      try {
        if (uidInput.length === 16) {
          response = await fetch(`http://localhost:3001/api/findNameByUid/${uidInput}`);
        } else {
          response = await fetch(`http://localhost:3001/api/findGroupNameByIdOrName?groupId=${uidInput}`);
        }
        if (response.ok) {
          const result = await response.json();
          const searchString = JSON.stringify(searchResults[0]);
          let checkname;
          
          if(uidInput.length === 16){
            checkname = '"' + result.name + '"';
          }
          else if(uidInput.length === 12){
            checkname = '"' + result.groupName + '"';
          }
          
          if (checkname === searchString) {
            setIsInputUid(true);
          }
        } else {
          console.error('Invalid UID');
        }
      } catch (error) {
        console.error('Error while fetching UID:', error);
      }
    } else {
      console.error('Invalid UID length');
    }
  };


  const handleSelectUser = (userName) => {
    onSelectUserName(userName, finalUid);

    if (grpFlag) {
      uploadUserToGroup(userName);
    } else {
      uploadUserContact(userName);
    }
    
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
          {!isUid && searchPerformed && (
            <form onSubmit={handleUid}>
              <input
                type="text"
                id="uidInput"
                name="uidInput"
                value={uidInput}
                onChange={(e) => setUidInput(e.target.value)}
                placeholder="Enter UID"
              />
              <button type="submit">Submit</button>
            </form>
          )}
        <div className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div key={index}>
                <p>{result}</p>
                {isInputUid ? (
                  <button onClick={() => handleSelectUser(result)}>Select</button>
                ) : (
                  <button disabled>Select</button>
                )}
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
