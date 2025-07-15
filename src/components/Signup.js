import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/event/signup', { email, password });
      alert('Signup successful. Please login.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
   <div className="auth-container">
  <h2>Signup</h2>
  <form onSubmit={handleSubmit}>
    <label>Email</label>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

    <label>Password</label>
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

    <button type="submit">Signup</button>
  </form>
</div>

  );
};

export default Signup;