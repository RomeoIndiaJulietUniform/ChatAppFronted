// ChatApp.jsx
import React, { useState, useEffect } from 'react';
import VerNavbar from './VerNavbar';
import ChatWindow from './ChatWindow';
import NoUidModal from './NoUidModal';
import '../CompStyles/ChatApp.css';

const ChatApp = () => {
  const [selectedUserName, setSelectedUserName] = useState('');
  const [showNoUidModal, setShowNoUidModal] = useState(false);

  useEffect(() => {
    // Fetch logic to check if UID is present in MongoDB
    const checkUidInMongoDB = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/checkUid/YOUR_UID', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response from server:', data);

          const uidExists = data.uidExists; // Replace with the actual response property

          if (!uidExists) {
            console.log('No UID found in MongoDB. Showing modal.');
            setShowNoUidModal(true);
          }
        } else {
          console.error('Failed to check UID in MongoDB. Status:', response.status);
        }
      } catch (error) {
        console.error('Error while checking UID:', error);
      }
    };

    checkUidInMongoDB();
  }, []); // Run only once when the component mounts

  return (
    <div className='chat-Container'>
      <VerNavbar apiUrl="http://localhost:5173/ChatWindow" setSelectedUserName={setSelectedUserName} />
      <ChatWindow selectedUserName={selectedUserName} />

      {showNoUidModal && <NoUidModal onRequestClose={() => setShowNoUidModal(false)} />}
    </div>
  );
};

export default ChatApp;
