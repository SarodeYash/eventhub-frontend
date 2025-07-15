import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchEvent.css';

const SearchEventById = () => {
  const [eventId, setEventId] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // ✅ PREVENT full-page reload
    if (eventId.trim() !== '') {
      navigate(`/event/${eventId}`);
    }
  };

  return (
    <form className="search-event-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Get Event
      </button>
    </form>
  );
};

export default SearchEventById;
