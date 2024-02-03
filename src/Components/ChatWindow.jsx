import React, { useState, useEffect } from 'react';
import VerNavbar from './VerNavbar';
import { useAuth0 } from '@auth0/auth0-react';
import "../CompStyles/ChatWindow.css";


const ChatWindow = (props) => {
  const { logout, user } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState([]);

  useEffect(() => {
  }, []); 

  const handleSendMessage = () => {
  };

  return (
    <div className='window'>
      <VerNavbar />
      <div className='chat-container'>
        <div className='chat-header'>
          <h3>props</h3>
        </div>
        <div className='chat-messages'>
          {messages.map((message, index) => (
            <div key={index} className={message.sender === user.name ? 'sent' : 'received'}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <div className='chat-input'>
          <input
            type='text'
            placeholder='Type your message...'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ChatWindow;
