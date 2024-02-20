import React, { useEffect } from 'react';
import Home from './Components/Home.jsx';
import './index.css';
import { useAuth0 } from '@auth0/auth0-react';
import ChatApp from './Components/ChatApp.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const { user, isLoading, error } = useAuth0();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const uploadUserToMongoDB = async () => {
      try {
        if (!user) return; 

        const response = await fetch(`${API_BASE_URL}/api/uploadUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
          }),
        });

        if (response.ok) {
          console.log('User uploaded to MongoDB');
        } else {
          console.error('Failed to upload user to MongoDB');
        }
      } catch (error) {
        console.error(error);
      }
    };

    uploadUserToMongoDB();
  }, [user]); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {user && <Route path="/ChatWindow" element={<ChatApp userEmail={user.email} />} />}
      </Routes>
    </Router>
  );
};

export default App;
