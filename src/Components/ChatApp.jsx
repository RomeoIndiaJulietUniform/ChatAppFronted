import React, { useState } from 'react';
import VerNavbar from './VerNavbar';
import ChatWindow from './ChatWindow';
import '../CompStyles/ChatApp.css';

const ChatApp = () => {
  const [selectedUserName, setSelectedUserName] = useState('');

  return (
    <div className='chat-Container'>
      <VerNavbar apiUrl="http://localhost:5173/ChatWindow" setSelectedUserName={setSelectedUserName} />
      <ChatWindow selectedUserName={selectedUserName} />
    </div>
  );
};

export default ChatApp;
