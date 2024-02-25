// Contact.js
import React from 'react';
import { FaGithub, FaLinkedin, FaGoogle, FaCopyright } from 'react-icons/fa';
import "../CompStyles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Me</h2>
      <div className="icon-wrapper">
        <a href="https://github.com/RomeoIndiaJulietUniform/ChatApp" target="_blank" rel="noopener noreferrer">
          <FaGithub className="contact-icon" />
        </a>
        <a href="https://www.linkedin.com/in/riju-mondal-137686244/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="contact-icon" />
        </a>
        <a href="mailto:contact.rijumondal@gmail.com">
          <FaGoogle className="contact-icon" />
        </a>
      </div>
      <h1 className="site-dedication">The site is dedicated in fond remembrance of Sir Philo Farnsworth</h1>
      <div className="copyright-wrapper">
        <FaCopyright className="copyright-logo" />
        <div className="copyright-text">2024 Riju Mondal. All Rights Reserved. </div>
      </div>
    </div>
  );
}

export default Contact;
