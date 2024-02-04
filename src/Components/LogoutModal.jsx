import React, { useState } from 'react';
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
      className="Modal"
      overlayClassName="ModalOverlay"
    >
      <button className="ModalCloseButton" onClick={onRequestClose}>
        <AiOutlineClose />
      </button>
      {user?.picture && <img src={user.picture} alt={user.name} />}
      <p>{user.name}</p>
      <button className="LogoutButton" onClick={logout}>
        Logout
      </button>
    </Modal>
  );
};

export default LogoutModal;
