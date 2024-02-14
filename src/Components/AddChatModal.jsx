import React, { useState } from 'react';
import "../CompStyles/AddChatModal.css";

const AddChatModal = ({ closeModal }) => {
  const [groupName, setGroupName] = useState('');
  const [memberIdentifier, setMemberIdentifier] = useState('');
  const [groupUid, setGroupUid] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleMemberIdentifierChange = (e) => {
    setMemberIdentifier(e.target.value);
  };

  const handleGroupUidChange = (e) => {
    setGroupUid(e.target.value);
  };

  const generateRandomUid = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleGenerateUid = () => {
    setGroupUid(generateRandomUid());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/createGroup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: groupName,
          memberEmails: memberIdentifier.trim(), // Assuming the member identifier is an email
          groupUid: groupUid.trim()
        }),
      });

      if (response.ok) {
        console.log('Group created successfully.');
        closeModal();
        // Add any further actions upon successful group creation
      } else {
        console.error('Failed to create group:', response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error('Error creating group:', error);
      // Handle error
    }
  };

  return (
    <div className="-new-modal-overlay">
      <div className="new-modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Add Chat</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={groupName}
            onChange={handleGroupNameChange}
          />
          <label htmlFor="memberIdentifier">Member Email:</label>
          <input
            type="text"
            id="memberIdentifier"
            name="memberIdentifier"
            value={memberIdentifier}
            onChange={handleMemberIdentifierChange}
          />
          <label htmlFor="groupUid">Group UID:</label>
          <input
            type="text"
            id="groupUid"
            name="groupUid"
            value={groupUid}
            onChange={handleGroupUidChange}
          />
          <button type="button" onClick={handleGenerateUid} className='uidb'>Generate UID</button>
          <button type="submit" className='crtgrp'>Create Group</button>
        </form>
      </div>
    </div>
  );
};

export default AddChatModal;
