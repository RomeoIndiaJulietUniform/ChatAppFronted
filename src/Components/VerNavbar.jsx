import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from 'react-modal';
import { FaPlus, FaSearch } from 'react-icons/fa';
import AddChatModal from './AddChatModal';
import SearchModal from './SearchModal';
import AddUidModal from './AddUidModal';
import LogoutModal from './LogoutModal';
import '../CompStyles/VerNavbar.css';

Modal.setAppElement('#root');

const VerNavbar = ({ apiUrl }) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [contactText, setContactText] = useState('');
  const [groupsText, setGroupsText] = useState('');
  const [profileText, setProfileText] = useState('');
  const [profileImagePath, setProfileImagePath] = useState('');
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddChatModalOpen, setIsAddChatModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAddUidModalOpen, setIsAddUidModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        setContactText(data.contactText);
        setGroupsText(data.groupsText);
        setProfileText(data.profileText);
        setProfileImagePath(data.profileImagePath);
        setContacts(data.contacts);
        setGroups(data.groups);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleUserClick = (userName) => {
    console.log('Selected User:', userName);

    setSelectedUserName(userName);
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

  const handleSelectUserName = (userName) => {
    setSelectedUserName(userName);
    closeAllModals(); // Close the search modal after selecting a user
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
        <ul style={{ paddingLeft: 0 }}>
          {selectedUserName && ( // Render only if selectedUserName is not null or undefined
            <li>
              <div className={`user-box ${selectedUserName === selectedUser ? 'selected' : ''}`} onClick={() => handleUserClick(selectedUserName)}>
                <p>{selectedUserName}</p>
              </div>
            </li>
          )}
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
      {isAddUidModalOpen && <AddUidModal closeModal={closeAllModals} />}
    </div>
  );
};

VerNavbar.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default VerNavbar;
