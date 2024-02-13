import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import AddChatModal from './AddChatModal';
import SearchModal from './SearchModal';
import AddUidModal from './AddUidModal';
import LogoutModal from './LogoutModal';
import '../CompStyles/VerNavbar.css';


const VerNavbar = ({ onSelectUserName, onSelectCurruid }) => {
  const { user, isAuthenticated } = useAuth0();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAddChatModalOpen, setIsAddChatModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAddUidModalOpen, setIsAddUidModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedOption,setSelectedOption] = useState('');
  const [currUid, setCurrUid] = useState('');
  const [fetchedNames, setFetchedNames] = useState([]); // State to store fetched names
  

  useEffect(() => {
    handleNameCall(currUid);
    onSelectCurruid(currUid); 
  }, [currUid]);

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
          console.log('UID:', data.uid);
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


  const handleUserClick = (userName,uid) => {
    setSelectedOption(userName);
    onSelectUserName([userName,uid]);

  };

  const openAddChatModal = () => {
    setIsAddChatModalOpen(true);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const openAddUidModal = () => {
    setIsAddUidModalOpen(true);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeAllModals = () => {
    setIsAddChatModalOpen(false);
    setIsSearchModalOpen(false);
    setIsAddUidModalOpen(false);
    setIsLogoutModalOpen(false);
  };

  const handleSelectUserName = (userName, finalUid) => {

    // Create a new array containing both userName and finalUid
    const newUser = [userName, finalUid];

    // Update selectedUsers state by appending the new array
    setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, newUser]);

    // Close the search modal after selecting a user
    closeAllModals();
};




  const handleNameCall = async (currUid) => {
    try {
      const response = await fetch(`http://localhost:3001/fetch-names/${currUid}`);
      const data = await response.json();
      console.log('Bro u so queit', currUid);
      setFetchedNames(data.names,data.uid);
      console.log('see there the glowing CIA man',data);
      console.log('data.names',data.names);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };
  

  
  return (
    <div className="ver-navbar">
      <div className='feat'>
        <div className="nav-item" onClick={openAddChatModal}>
          <span role="img" aria-label="plus-icon" className='plusicon'>
            ➕
          </span>
        </div>
        <div className="nav-item" onClick={openSearchModal}>
          <FaSearch className="srchicon" />
        </div>
        <div className="nav-item" onClick={openAddUidModal}>
          <span role="img" aria-label="uid-icon" className='uid-icon'>
            Create or Change New UID
          </span>
        </div>
      </div>
      <div className="user-data">
        {/* Logging the user-data */}
        {console.log('User Data come come come comeaway :', selectedUsers)}
        <ul style={{ paddingLeft: 0 }}>
          {/* Render selected users */}
          {selectedUsers.map((user, index) => (
            <li key={index}>
              <div className={`user-box ${user[0] === selectedOption ? 'selected' : ''}`} onClick={() => handleUserClick(user[0], user[1])}>
                <p>{user[0]}</p> {/* Display the username */}
              </div>
            </li>
          ))}
          {/* Render fetched names */}
                  {fetchedNames.map(({ name, uid }, index) => (
          <li key={index}>
            <div className={`user-box ${name === selectedOption ? 'selected' : ''}`} onClick={() => handleUserClick(name, uid)}>
              <p>{name}</p>
            </div>
          </li>
        ))}

        </ul>
      </div>

      <div>
        {isAuthenticated && (
          <article className='imgauth' onClick={openLogoutModal}>
            {user?.picture && <img src={user.picture} alt={user.name} />}
          </article>
        )}

        {isLogoutModalOpen && <LogoutModal isOpen={isLogoutModalOpen} onRequestClose={closeAllModals} />}
      </div>

      {isAddChatModalOpen && <AddChatModal closeModal={closeAllModals} />}
      {isSearchModalOpen && <SearchModal closeModal={closeAllModals} onSelectUserName={handleSelectUserName} />}
      {isAddUidModalOpen && <AddUidModal closeModal={closeAllModals}/>}
    </div>
  );
};



export default VerNavbar;
