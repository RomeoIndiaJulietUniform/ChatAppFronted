// Contact.js
import React from 'react';
import { FaGithub, FaLinkedin, FaGoogle, FaCopyright } from 'react-icons/fa';
import "../CompStyles/Contact.css";

const Contact = () => {
  return (
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
  );
}

export default Contact;
