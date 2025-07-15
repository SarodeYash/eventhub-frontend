import React from 'react';
import EventList from './components/EventList';
import SearchEventById from './components/SearchEventById';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ token }) => {
  return (
  <div className="home-page-layout">
    
    {/* Left Panel: Navigation Icons */}
    <div className="home-left">
      <h3 className="section-heading">🚀 Quick Links</h3>

      {token ? (
        <>
          <Link to="/create" className="nav-icon-link">➕ Create Event</Link>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload(); // or navigate('/login');
            }}
          >
            🚪 Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-icon-link">🔐 Login</Link>
          <Link to="/signup" className="nav-icon-link">📝 Signup</Link>
        </>
      )}
    </div>

    {/* Center Panel: Events */}
    <div className="home-center">
    <div className="eventhub-heading">
  <h1>
    EventHub
    <span className="eventhub-icon">🎈</span>
  </h1>
  <p className="tagline">Your Portal to Every Event</p>
</div>

      <h3 className="section-heading">📋 All Events</h3>
      <EventList />
    </div>

    {/* Right Panel: Search Event by ID */}
    <div className="home-right">
      <h3 className="section-heading">🔍 Search Event by ID</h3>
      <SearchEventById />
    </div>
  </div>
);

};

export default Home;
