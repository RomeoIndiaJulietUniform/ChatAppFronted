import React, { useState } from 'react';
import "../CompStyles/AddChatModal.css";

const AddChatModal = ({ closeModal }) => {
  const [groupName, setGroupName] = useState('');
  const [memberEmails, setMemberEmails] = useState('');

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleMemberEmailsChange = (e) => {
    setMemberEmails(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: groupName,
          memberEmails: memberEmails.split(',').map(email => email.trim()), // Assuming member emails are comma-separated
        }),
      });

      if (response.ok) {
        console.log('Group created successfully.');
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
    <div className="modal-overlay">
      <div className="modal-content">
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
          <label htmlFor="memberEmails">Member Emails (comma-separated):</label>
          <input
            type="text"
            id="memberEmails"
            name="memberEmails"
            value={memberEmails}
            onChange={handleMemberEmailsChange}
          />
          <button type="submit">Create Group</button>
        </form>
      </div>
    </div>
  );
};

export default AddChatModal;
