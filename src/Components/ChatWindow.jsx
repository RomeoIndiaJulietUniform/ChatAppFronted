import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../CompStyles/ChatWindow.css';
import { FaGithub, FaLinkedin, FaGoogle, FaArrowLeft } from 'react-icons/fa';
import io from 'socket.io-client';

const ChatWindow = (props) => {
  const { user } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [curUid, setCurUid] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactUid, setContactUid] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [socket, setSocket] = useState(null);
  const [concatenatedIds, setConcatenatedIds] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (props.selectedUserName && props.selectedUserName.length > 0) {
      setContactName(props.selectedUserName[0][0]);
      setContactUid(props.selectedUserName[0][1]);
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  }, [props.selectedUserName]);

  useEffect(() => {
    setCurUid(props.currUid);
  }, [props.currUid]);

  useEffect(() => {
    const newSocket = io(API_BASE_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        console.log('Received message:', message.message);
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = () => {
    if (socket) {
      const newMessage = {
        message: inputMessage,
        senderId: curUid,
        receiverId: contactUid
      };
      const newConcatenatedIds = `${curUid}-${contactUid}`;
      socket.emit('sendMessage', newMessage);
      saveMessage(newConcatenatedIds, newMessage.message);
      setInputMessage('');
      setConcatenatedIds(newConcatenatedIds);
    }
  };

  const saveMessage = async (concatenatedIds, message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ concatenatedIds, message })
      });
      if (!response.ok) {
        throw new Error('Failed to save message');
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleBackButtonClick = () => {
    window.location.reload();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className='window'>
      {showChat ? (
        <div className='chat-container'>
          <div className='chat-header'>
            {isMobile && <FaArrowLeft className='back-button' onClick={handleBackButtonClick} />}
            <h3>{contactName}</h3>
          </div>
          <div className='chat-messages'>
            {messages.map((message, index) => (
              <p key={index} className={message.receiverId === curUid ?  'received-message': 'sent-message' }>{message.message}</p>
            ))}
          </div>
          <div className='chat-input'>
            <input
              type='text'
              placeholder='Type your message...'
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
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
          <div className='footer'>
            <div className="copyright-container">
              <span className="copyright-logo">©</span>
              <div className="copyright-text">2024 Riju Mondal. All Rights Reserved.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
