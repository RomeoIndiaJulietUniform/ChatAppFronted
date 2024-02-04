import React, { useState } from 'react';
import "../CompStyles/AddUidModal.css" // Import your CSS file for styling
import "../CompStyles/AddUidModal.css"

const AddUidModal = ({ closeModal }) => {
  const [uid, setUid] = useState('');

  const handleUidChange = (e) => {
    setUid(e.target.value);
  };

  const handleSaveUid = () => {
    // Add logic here to save the UID, e.g., make an API call
    console.log('UID saved:', uid);

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content add-uid-modal">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Add or Change UID</h2>
        {/* Add your modal content here */}
        <form>
          <label htmlFor="uidInput">Enter UID:</label>
          <input
            type="text"
            id="uidInput"
            name="uidInput"
            value={uid}
            onChange={handleUidChange}
          />
          <button type="button" onClick={handleSaveUid}>
            Save UID
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUidModal;
