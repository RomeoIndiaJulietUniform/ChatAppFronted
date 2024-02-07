// NoUidModal.jsx
import React, { useState } from 'react';
import '../CompStyles/NoUidModal.css';

const NoUidModal = ({ onRequestClose }) => {
  const [uid, setUid] = useState('');

  const handleUploadUserWithUid = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/uploadUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }), // Pass the uid in the request body
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User uploaded successfully:', data);
        onRequestClose(); // Close modal after successful upload
      } else {
        console.error('Failed to upload user:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading user:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>No UID Found</h2>
        <p>Please provide a UID to continue.</p>
        <input type="text" placeholder="Enter UID" value={uid} onChange={(e) => setUid(e.target.value)} />
        <button onClick={handleUploadUserWithUid}>Upload User</button>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default NoUidModal;
