import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../CompStyles/ChatWindow.css';
import { FaGithub, FaLinkedin, FaGoogle, FaCopyright } from 'react-icons/fa';
import io from 'socket.io-client';

const ChatWindow = (props) => {
  const { user } = useAuth0(); // Get user information using useAuth0
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [curUid, setCurUid] = useState('');
  const [contactname, setContactname] = useState('');
  const [contactuid, setContactuid] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [socket, setSocket] = useState(null); // State to hold the socket connection

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
    // Establish socket connection
    const newSocket = io(API_BASE_URL);
    console.log('Socket connected:', newSocket);
    setSocket(newSocket);

    // Disconnect socket when component unmounts
    return () => {
      newSocket.disconnect();
      console.log('Socket disconnected');
    };
  }, []); // Run only once when component mounts

  useEffect(() => {
    // Listening for incoming messages
    if (socket) {
      socket.on('privateMessage', (message) => {
        console.log('Received message:', message);
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (socket) {
      const newMessage = {
        message: inputMessage,
        senderId: curUid,
        receiverId: contactuid
      };
      console.log('Sending message:', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]); // Update state with the sent message

      socket.emit('privateMessage', newMessage);
      setInputMessage(''); 
    }
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
              <div key={index} className={message.senderId === curUid ? 'sent' : 'received'}>
                <p>{message.message}</p>
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
