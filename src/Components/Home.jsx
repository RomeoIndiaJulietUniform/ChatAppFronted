import React, { useState, useRef, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "../CompStyles/Home.css";
import Navbar from './Navbar.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Feature from './Feature.jsx';
import { useNavigate  } from 'react-router-dom';


const Home = () => {
  const [username, setUsername] = useState('');
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const featureRef = useRef(null);


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
      <div>
      <Navbar scrollRefs={scrollRefs} />
        <div className="content">
          <p>Home</p>

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
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="clickable-input"
                  />
                  {!isAuthenticated ? (
                    <button id="submit-btn" onClick={loginWithRedirect}>CLAIM USERNAME</button>
                  ) : (
                    <button id="submit-btn" onClick={handleClaimUsername}>CLAIM</button>
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
