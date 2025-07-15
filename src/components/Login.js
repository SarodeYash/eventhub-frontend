import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <label>Email</label>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <label>Password</label>
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

    <button type="submit">Login</button>
  </form>
</div>
  );
};

export default Login;