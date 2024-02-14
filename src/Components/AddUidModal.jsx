import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "../CompStyles/AddUidModal.css"; // Import your CSS file for styling

const AddUidModal = ({ closeModal }) => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const [uid, setUid] = useState('');
  const [newUid, setNewUid] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch UID based on email and name once user is authenticated
      fetchUidByEmailAndName(user.email, user.name);
    }
  }, [isAuthenticated]);

  const fetchUidByEmailAndName = async (email, name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/checkUidByEmailAndName?email=${email}&name=${name}`);
      if (response.ok) {
        const data = await response.json();
        if (data.uid) {
          setUid(data.uid);
        } else {
          setUid('No user found'); // Or handle the case where no user is found
        }
      } else {
        console.error('Failed to fetch UID:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching UID:', error);
    }
  };

  const handleSaveUid = async () => {
    try {
      // Ensure user exists before trying to save the UID
      if (!user) {
        console.error('User not found');
        return;
      }

      // Add logic here to save the new UID
      const response = await fetch(`${API_BASE_URL }/api/replaceUid`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldUid: uid, // Use the fetched UID or the initial UID from Auth0
          newUid: newUid, // Use the new UID obtained from the input box
        }),
      });

      if (response.ok) {
        console.log('UID saved successfully');
      } else {
        console.error('Failed to save UID:', response.statusText);
      }

      // Close the modal
      closeModal();
    } catch (error) {
      console.error('Error saving UID:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content customized-add-uid-modal">
        <span className="custom-close" onClick={closeModal}>
          &times;
        </span>
        <h2>UID Details</h2>
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
        <label htmlFor="uidInput">Enter New UID:</label>
        <input
          type="text"
          id="uidInput"
          name="uidInput"
          value={newUid}
          onChange={(e) => setNewUid(e.target.value)}
        />
        <p>Current UID: {uid}</p>
        <button type="button" onClick={handleSaveUid}>
          Save UID
        </button>
      </div>
    </div>
  );
  
};

export default AddUidModal;
