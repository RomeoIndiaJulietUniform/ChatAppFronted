// NoUidModal.jsx
import React from 'react';
import '../CompStyles/NoUidModal.css';

const NoUidModal = ({ onRequestClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>No UID Found</h2>
        <p>Please provide a UID to continue.</p>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default NoUidModal;
