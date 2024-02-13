import React, { useState } from 'react';
import { RiFileCopyLine } from 'react-icons/ri'; // Importing the copy icon
import '../CompStyles/NoUidModal.css';

const NoUidModal = ({ onRequestClose }) => {
  const [uid, setUid] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Function to generate a random UID
  const generateRandomUid = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleGenerateUid = () => {
    const generatedUid = generateRandomUid();
    setUid(generatedUid);
  };

  const handleCopyUid = () => {
    navigator.clipboard.writeText(uid);
  };

  const handleUploadUserWithUid = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/uploadUser`, {
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
        <div className="uid-input-container">
          <input type="text" placeholder="Enter UID" value={uid} onChange={(e) => setUid(e.target.value)} />
          <button className="copy-button" onClick={handleCopyUid}><RiFileCopyLine /></button>
        </div>
        <button onClick={handleGenerateUid}>Generate Random UID</button>
        <button onClick={handleUploadUserWithUid}>Upload User</button>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default NoUidModal;
