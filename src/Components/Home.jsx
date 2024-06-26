import React, { useState, useRef, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "../CompStyles/Home.css";
import Navbar from './Navbar.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Feature from './Feature.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const featureRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1026 && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Initial check for screen size
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const maxTranslation = 1400;

  const scrollRefs = {
    aboutRef,
    contactRef,
    featureRef,
  };

  const handleClaimUsername = () => {
    console.log(`Username claimed: ${username}`);
    navigate('/ChatWindow');
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/ChatWindow');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className='main'>
        <Navbar className='navbar' scrollRefs={scrollRefs} />
        <div className="content">
          {isLargeScreen && (
            <div className="parallax-image" style={{ transform: `translateY(${Math.min(scrollPosition * 1.5, maxTranslation)}px)` }}></div>
          )}

          <div className="claim-username-container">
            <div className='container'>
              <div className='para'>
                <h1>Unifying lives</h1>
                <div className='txt'>
                  <div className='whte'>
                    <h1>Near</h1>
                  </div>
                  <span className='blk'><h1>and</h1></span>
                  <div className='whte'>
                    <h1>Far</h1>
                  </div>
                </div>
              </div>

              <div className="input-container">
                <div id="wrap112" className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="clickable-input"
                    placeholder='Enter your Email address'
                  />
                  {!isAuthenticated ? (
                    <button id="submit-btn" onClick={loginWithRedirect}>ENTER</button>
                  ) : (
                    <button id="submit-btn" onClick={handleClaimUsername}>ENTERED</button>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        <div ref={aboutRef} id="about">
          <About />
        </div>

        <div ref={featureRef} id="feature">
          <Feature />
        </div>

        <div ref={contactRef} id="contact">
          <Contact />
        </div>

      </div>
    </>
  );
}

export default Home;
