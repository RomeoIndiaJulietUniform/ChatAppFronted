import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../CompStyles/ChatWindow.css';
import { FaGithub, FaLinkedin, FaGoogle, FaArrowLeft } from 'react-icons/fa';
import io from 'socket.io-client';
import NewsCrawl from './NewsCrawl';


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
  const [sendMsg, setSendMsg] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

 useEffect(() => {
  if (props.selectedUserName && props.selectedUserName.length > 0) {
    setContactName(props.selectedUserName[0][0]);
    setContactUid(props.selectedUserName[0][1]);
    setShowChat(true);
    setConcatenatedIds(`${props.currUid}-${props.selectedUserName[0][1]}`);
    fetchMessages(`${props.currUid}-${props.selectedUserName[0][1]}`);
    fetchMessagesSender(`${props.selectedUserName[0][1]}-${props.currUid}`);
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
        if (message.receiverId === curUid) {
          setMessages(prevMessages => [...prevMessages, message]);
        }
      });
    }
  }, [socket, curUid]);




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
      socket.emit('sendMessage', newMessage);
      console.log('no mans land', newMessage);
      console.log('Flag Enabled brother', curUid);
      setSendMsg(true);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      saveMessage(concatenatedIds, newMessage.message);
      setInputMessage('');
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

  const fetchMessages = async (concatenatedIds) => {
    try {
      console.log('Fetching messages...');
      console.log('Concatenated IDs:', concatenatedIds);

      const response = await fetch(`${API_BASE_URL}/custom-path/${concatenatedIds}`);
      if (response.ok) {
        console.log('Successfully received response.');
        const data = await response.json();
        console.log('Received data:', data);
        const len = data.length;
        for(let i = 0; i < len ; i++){
          /*setMessages(prevMessages => [...prevMessages, data[i]]); */
        }
        
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };



  const fetchMessagesSender = async (concatenatedId) => {
    try {
      console.log('Fetching messages...');
      console.log('Concatenated IDs:', concatenatedId);

      const response = await fetch(`${API_BASE_URL}/custom-path/${concatenatedId}`);
      if (response.ok) {
        console.log('Successfully received response.');
        const data = await response.json();
        console.log('Received data:', data);
        const len = data.length;
        for(let i = 0; i < len ; i++){
          /*setMessages(prevMessages => [...prevMessages, data[i]]);*/
        }
        
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleBackButtonClick = () => {
    props.setShowChatWindow(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
   

  const sortedMessages = [...messages].sort((messageA, messageB) => {
    const timestampA = new Date(messageA.timestamp).getTime();
    const timestampB = new Date(messageB.timestamp).getTime();
    return timestampA - timestampB;
  });

return (
  <div className='window'>
    {showChat ? (
      <div className='chat-container'>
        <div className='chat-header'>
          {isMobile && <FaArrowLeft className='back-button' onClick={handleBackButtonClick} />}
          <h3>{contactName}</h3>
        </div>
        <div className='news_crawl' >
        <NewsCrawl />
        </div>
        <div className='chat-messages'>
          {sortedMessages.map((message, index) => (
            <p 
              key={index} 
              className={
                message.receiverId === curUid || message.concatenatedIds !== concatenatedIds 
                ? 'received-message' 
                : 'sent-message'

              }
            >
              {message.message}
            </p>
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
      <div className='BlankWindow'>
      <div className="contact-section">
        <h2>Contact Me</h2>
        <div className="icon-container">
          <a href="https://github.com/RomeoIndiaJulietUniform/ChatApp" target="_blank" rel="noopener noreferrer">
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
      </div>
    )}
  </div>
); 
};

export default ChatWindow;
