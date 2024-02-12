// ChatApp.jsx
import React, { useState, useEffect } from 'react';
import VerNavbar from './VerNavbar';
import ChatWindow from './ChatWindow';
import NoUidModal from './NoUidModal';
import '../CompStyles/ChatApp.css';

const ChatApp = ({ userEmail }) => {
  const [selectedUserName, setSelectedUserName] = useState('');
  const [showNoUidModal, setShowNoUidModal] = useState(false);


  const handleSelectedUser = (userName) => {
    setSelectedUserName(userName);
    console.log('Overlord Actual Nikolai is free', selectedUserName);
  };



  useEffect(() => {
    // Fetch logic to check if userEmail is present in MongoDB
    const checkUserEmailInMongoDB = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/checkUserEmail/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response from server:', data);

          const emailExists = data.emailExists;

          if (!emailExists) {
            console.log('User email not found in MongoDB. Showing modal.');
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
  }, [userEmail]); // Run whenever userEmail changes

  return (
    <div className='chat-Container'>
      <VerNavbar onSelectUserName={handleSelectedUser}  />
      <ChatWindow selectedUserName={selectedUserName} />

      {console.log('showNoUidModal:', showNoUidModal)}
      {showNoUidModal && <NoUidModal onRequestClose={() => setShowNoUidModal(false)} />}
    </div>
  );
};

export default ChatApp;
