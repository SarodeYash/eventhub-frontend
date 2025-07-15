import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/event')
      .then(res => {
        setEvents(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch events:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="event-list">
          {events.map(event => (
            <li key={event.ID}>
              <Link to={`/event/${event.ID}`} state={{ event }}>
                <span className="event-icon">📅</span> {event.Name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
