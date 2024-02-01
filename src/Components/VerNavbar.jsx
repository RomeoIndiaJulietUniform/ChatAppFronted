import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../CompStyles/VerNavbar.css';
import userData from '../Mockdata/user_info.json';
import "../CompStyles/VerNavbar.css"

const VerNavbar = ({ apiUrl }) => {
  const [contactText, setContactText] = useState('');
  const [groupsText, setGroupsText] = useState('');
  const [profileText, setProfileText] = useState('');
  const [profileImagePath, setProfileImagePath] = useState('');
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl); // Assuming apiUrl is a valid endpoint
        const data = await response.json();

        setContactText(data.contactText);
        setGroupsText(data.groupsText);
        setProfileText(data.profileText);
        setProfileImagePath(data.profileImagePath);
        setContacts(data.contacts);
        setGroups(data.groups);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="ver-navbar">
      <div className="nav-item">{contactText}</div>
      <div className="nav-item">{groupsText}</div>
      <div className="nav-item">{profileText}</div>
      <div className="user-data">
        <h4>User Data</h4>
        <ul>
          {userData.map((user, index) => (
            <li key={index}>
              <p>Name: {user.name}</p>
              <p>Gender: {user.gender}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

VerNavbar.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default VerNavbar;
