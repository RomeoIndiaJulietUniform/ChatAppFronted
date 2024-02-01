// Feature.js
import React from 'react';
import '../CompStyles/Feature.css';

const Feature = () => {
  return (
    <div className="feature-container">
      <div className="news-crawl">Breaking News: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      <div className="news-crawl-reverse">Latest Updates: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
      {/* Remove the Feature Content and add a line element */}
      <div className="line-element"></div>
    </div>
  );
}

export default Feature;
