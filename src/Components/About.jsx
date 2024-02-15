import React, { useState, useEffect, useRef } from 'react';
import '../CompStyles/About.css';
import aboutImage from '../Images/Chatapp.png';

const About = ({ scrollPosition }) => {
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const prevScrollPosition = useRef(scrollPosition);

  const scrollDirection = scrollPosition > prevScrollPosition.current ? 'down' : 'up';

  const handleScroll = () => {
    const currentIndex = Math.floor(scrollPosition / window.innerHeight);

    if (scrollDirection === 'down' && currentIndex !== paragraphIndex) {
      setParagraphIndex(currentIndex);
    } else if (scrollDirection === 'up' && currentIndex !== paragraphIndex) {
      setParagraphIndex(currentIndex + 1);
    }

    prevScrollPosition.current = scrollPosition;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="about-container">
      <div className="about-image" style={{ transform: `translateY(${scrollPosition * 0.3}px)` }}>
        <img src={aboutImage} alt="About" />
      </div>
      <div className="about-content">
        <h1>Welcome to Chat App!</h1>
        <p>Connect effortlessly with unique IDs.</p>
        <p>Seamless chat, bringing people together.</p>
        <p>Unlock meaningful connections with innovation.</p>
        <p>Explore nearby connections, foster interactions.</p>
        <p>Secure platform, prioritize privacy and safety.</p>
      </div>
    </div>
  );
}

export default About;


