import React, { useState } from 'react';
import Modal from 'react-modal';
import "../CompStyles/Navbar.css";
import { useAuth0 } from '@auth0/auth0-react';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = ({ scrollRefs }) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <nav className="custom-navbar">
        <div className="custom-navbar-left">
          <ul>
            <li onClick={() => handleScrollTo(scrollRefs.aboutRef)}><a href="#about"><h1>ABOUT</h1></a></li>
            <li onClick={() => handleScrollTo(scrollRefs.featureRef)}><a href="#feature"><h1>FEATURE</h1></a></li>
            <li onClick={() => handleScrollTo(scrollRefs.contactRef)}><a href="#contact"><h1>CONTACT</h1></a></li>
          </ul>
        </div>
        <div className="custom-navbar-right">
          <li className="custom-login-btn">
            {!isAuthenticated && (
              <button onClick={loginWithRedirect}>Login</button>
            )}
            {isAuthenticated && (
              <>
                <article className='custom-imgauth' onClick={openModal}>
                  {user?.picture && <img src={user.picture} alt={user.name} />}
                </article>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="User Image Modal"
                  className="CustomModal"
                  overlayClassName="CustomModalOverlay"
                >
                  <button className="CustomModalCloseButton" onClick={closeModal}>
                    <AiOutlineClose />
                  </button>
                  {user?.picture && <img src={user.picture} alt={user.name} />}
                  <p>{user.name}</p>
                  <button className="CustomLogoutButton" onClick={logout}>
                    Logout
                  </button>
                </Modal>
              </>
            )}
          </li>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
