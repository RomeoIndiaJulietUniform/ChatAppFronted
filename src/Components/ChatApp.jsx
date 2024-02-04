import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import VerNavbar from './VerNavbar';
import ChatWindow from './ChatWindow';
import LogoutModal from './LogoutModal';
import '../CompStyles/ChatApp.css';

const ChatApp = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [selectedUserName, setSelectedUserName] = useState('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    // You can perform any side effects or initialization related to authentication here
  }, [isAuthenticated]);

  return (
    <div className='chat-Container'>
      <VerNavbar apiUrl="http://localhost:5173/ChatWindow" setSelectedUserName={setSelectedUserName} />
      <ChatWindow selectedUserName={selectedUserName} />

      {isAuthenticated && (
        <article className='imgauth' onClick={openLogoutModal}>
          {user?.picture && <img src={user.picture} alt={user.name} />}
        </article>
      )}

      {isLogoutModalOpen && <LogoutModal isOpen={isLogoutModalOpen} onRequestClose={closeLogoutModal} />}
    </div>
  );
};

export default ChatApp;
