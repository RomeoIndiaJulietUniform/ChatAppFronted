import React, { useState, useEffect } from 'react';
import VerNavbar from './VerNavbar';
import ChatWindow from './ChatWindow';
import NoUidModal from './NoUidModal';
import '../CompStyles/ChatApp.css';

const ChatApp = ({ userEmail }) => {
  const [selectedUserName, setSelectedUserName] = useState([]);
  const [showNoUidModal, setShowNoUidModal] = useState(false);
  const [currUid, setCurrUid] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showChatWindow, setShowChatWindow] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSelectedUser = (userName, uid) => {
    setSelectedUserName([userName, uid]);
    setShowChatWindow(true);
  };

  const handleCurrUid = (uid) => {
    setCurrUid(uid);
  };

  useEffect(() => {
    const checkUserEmailInMongoDB = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/checkUserEmail/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const emailExists = data.emailExists;

          if (!emailExists) {
            setShowNoUidModal(true);
          }
        } else {
          console.error('Failed to check user email in MongoDB. Status:', response.status);
        }
      } catch (error) {
        console.error('Error while checking user email:', error);
      }
    };

    checkUserEmailInMongoDB();
  }, [userEmail]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='chat-Container'>
      { (!isMobile || !showChatWindow)  && <VerNavbar onSelectUserName={handleSelectedUser} onSelectCurruid={handleCurrUid} />}
      {(!isMobile || showChatWindow) && <ChatWindow selectedUserName={selectedUserName} currUid={currUid} />}
      {showNoUidModal && <NoUidModal onRequestClose={() => setShowNoUidModal(false)} />}
    </div>
  );
};

export default ChatApp;
