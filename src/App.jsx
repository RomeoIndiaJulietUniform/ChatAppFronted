import React from 'react';
import Home from './Components/Home.jsx';
import './index.css';
import { useAuth0 } from '@auth0/auth0-react';
import ChatWindow from './Components/ChatWindow.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const { isLoading, error } = useAuth0();

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
        <Route path="/ChatWindow" element={<ChatWindow />} />
      </Routes>
    </Router>
  );
};

export default App;
