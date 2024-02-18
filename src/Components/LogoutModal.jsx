import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import '../CompStyles/LogoutModal.css';

Modal.setAppElement('#root');

const LogoutModal = ({ isOpen, onRequestClose }) => {
  const { user, logout } = useAuth0();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Image Modal"
      className="logout-modal-container"
      overlayClassName="logout-modal-overlay"
    >
      <button className="modal-close-button" onClick={onRequestClose}>
        <AiOutlineClose className="close-icon" />
      </button>
      {user?.picture && <img className="user-image" src={user.picture} alt={user.name} />}
      <p className="user-name">{user.name}</p>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </Modal>
  );
};

export default LogoutModal;
