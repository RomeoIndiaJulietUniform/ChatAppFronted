import React from 'react';
import "../CompStyles/AddChatModal.css"

const AddChatModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Add Chat</h2>
        {/* Add your modal content here */}
        <form>
          <label htmlFor="chatName">Chat Name:</label>
          <input type="text" id="chatName" name="chatName" />
          <button type="submit">Create Chat</button>
        </form>
      </div>
    </div>
  );
};

export default AddChatModal;
