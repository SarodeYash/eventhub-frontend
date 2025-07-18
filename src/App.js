import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; // 👈 Add this

import EventDetail from './components/EventDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateEvent from './components/CreateEvent';
import Home from './Home';

// ✅ Add Axios setup here
axios.defaults.baseURL = 'https://eventhub-backend-production.up.railway.app';
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   setToken(null);
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update/:id" element={<CreateEvent isUpdate={true} />} />
        {token && <Route path="/create" element={<CreateEvent />} />}
        {!token && <Route path="/create" element={<Navigate to="/login" />} />}
      </Routes>
    </Router>
  );
};

export default App;
