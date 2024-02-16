import React, { useState, useEffect } from 'react';
import { RiFileCopyLine } from 'react-icons/ri';
import '../CompStyles/NoUidModal.css';

const NoUidModal = ({ onRequestClose }) => {
  const [uid, setUid] = useState('');
  const [uidExists, setUidExists] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setUploadDisabled(uid.length !== 16);
  }, [uid]);

  const generateRandomUid = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleGenerateUid = async () => {
    const generatedUid = generateRandomUid();
    const uidExists = await checkUidExists(generatedUid);
    if (!uidExists) {
      setUid(generatedUid);
    }
  };

  const checkUidExists = async (uid) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/checkUid/${uid}`);
      if (response.ok) {
        const data = await response.json();
        setUidExists(data.exists);
        return data.exists;
      } else {
        console.error('Failed to check UID:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error checking UID:', error);
      return false;
    }
  };

  const handleCopyUid = () => {
    navigator.clipboard.writeText(uid);
  };

  const handleUploadUserWithUid = async () => {
    try {
      if (uid.length !== 16) return;
      const response = await fetch(`${API_BASE_URL}/api/uploadUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User uploaded successfully:', data);
        onRequestClose();
      } else {
        console.error('Failed to upload user:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading user:', error);
    }
  };

  return (
    <div className="unique-overlay">
      <div className="unique-modal">
        <h2>No UID Found</h2>
        <p>Please provide a UID to continue.</p>
        <div className="unique-uid-input-container">
          <input type="text" placeholder="Enter UID" value={uid} onChange={(e) => setUid(e.target.value)} />
          <button className="unique-copy-button" onClick={handleCopyUid}><RiFileCopyLine /></button>
        </div>
        <button onClick={handleGenerateUid}>Generate Random UID</button>
        <button onClick={handleUploadUserWithUid} disabled={uploadDisabled}>Upload User</button>
        {uidExists && <p>This UID already exists. Please choose another one.</p>}
        {uid.length !== 16 && <p>The UID must be 16 characters long.</p>}
      </div>
    </div>
  );
};

export default NoUidModal;
