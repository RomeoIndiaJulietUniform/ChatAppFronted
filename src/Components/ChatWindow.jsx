import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../CompStyles/ChatWindow.css';
import { FaGithub, FaLinkedin, FaGoogle, FaCopyright } from 'react-icons/fa';
import io from 'socket.io-client';

const ChatWindow = (props) => {
  const { user } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [curUid, setCurUid] = useState('');
  const [contactname, setContactname] = useState('');
  const [contactuid, setContactuid] = useState('');
  const prevReceiverId = useRef('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (props.selectedUserName && props.selectedUserName.length > 0) {
      setContactname(props.selectedUserName[0][0]);
      setContactuid(props.selectedUserName[0][1]);
    }
  }, [props.selectedUserName]);

  useEffect(() => {
    setCurUid(props.currUid);
  }, [props.currUid]);

  useEffect(() => {
    const socket = io(API_BASE_URL); // Replace with your server URL
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Listening for incoming messages
    socket.on('privateMessage', (message) => {
      console.log('Received message:', message);
      setMessages([...messages, message]);
    });

  }, [contactuid]); // Listen for changes in contactuid

  const handleSendMessage = () => {
    const socket = io(API_BASE_URL); // Replace with your server URL
    socket.emit('privateMessage', {
      message: inputMessage,
      senderId: curUid,
      receiverId: contactuid
    });
    setInputMessage(''); 
  };

  
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
        <div className="contact-section">
          <h2>Contact Me</h2>
          <div className="icon-container">
            <a href="https://github.com/RomeoIndiaJulietUniform" target="_blank" rel="noopener noreferrer">
              <FaGithub className="icon" />
            </a>
            <a href="https://www.linkedin.com/in/riju-mondal-137686244/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="icon" />
            </a>
            <a href="mailto:contact.rijumondal@gmail.com">
              <FaGoogle className="icon" />
            </a>
          </div>
          <h1>The site is dedicated in fond remembrance of Sir Philo Farnsworth</h1>
          <div className="copyright-container">
            <FaCopyright className="copyright-logo" />
            <div className="copyright-text">2024 Riju Mondal. All Rights Reserved. </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
