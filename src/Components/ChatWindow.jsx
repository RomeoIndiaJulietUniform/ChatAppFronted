import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../CompStyles/ChatWindow.css';

const ChatWindow = (props) => {
  const { logout, user } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState([]);

  useEffect(() => {
    // Use props.selectedUserName for any side effects or initialization
  }, [props.selectedUserName]);

  const handleSendMessage = () => {
    // Add your logic to send a message
  };

  // Render chat window content only if props.selectedUserName is selected
  return (
    <div className='window'>
      {props.selectedUserName ? (
        <div className='chat-container'>
          <div className='chat-header'>
            <h3>{props.selectedUserName}</h3>
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
      ) : (
        <div>
          {/* Render a blank div or any other content when props.selectedUserName is not selected */}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
