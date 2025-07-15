import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [event, setEvent] = useState(location.state?.event || null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  // 👇 Fetch event if not passed via Link state
  useEffect(() => {
    if (!event) {
      axios.get(`/event/${id}`)
        .then(res => setEvent(res.data))
        .catch(err => {
          console.error("Error fetching event", err);
          setError("Event not found");
        });
    }
  }, [id, event]);

  const handleRegister = async () => {
    try {
      await axios.post(`/event/register/${id}`);
      setIsRegistered(true);
      alert('✅ Registered successfully!');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('❌ Registration failed');
    }
  };

  const handleCancel = async () => {
    try {
      await axios.delete(`/event/cancel/${id}`);
      setIsRegistered(false);
      alert('✅ Registration canceled!');
    } catch (err) {
      console.error('Cancellation failed:', err);
      setError('❌ Cancel failed');
    }
  };

 if (error) return (
  <div className="error-container">
    <h2>❌ Event Not Found</h2>
    <p>We couldn’t find the event you’re looking for.</p>
    <Link to="/" className="back-home">⬅️ Back to Home</Link>
  </div>
);

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="event-detail-card">
      <h2>{event.Name}</h2>
      <p><strong>📝 Description:</strong> {event.Description}</p>
      <p><strong>🗓 Date & Time:</strong> {new Date(event.DateTime).toLocaleString()}</p>
      <p><strong>📍 Location:</strong> {event.Location}</p>

      {/* Registration Buttons */}
      <div className="event-detail-buttons">
        {!isRegistered ? (
          <button className="register-button" onClick={handleRegister}>
            ✅ Register for Event
          </button>
        ) : (
          <button className="cancel-button" onClick={handleCancel}>
            ❌ Cancel Registration
          </button>
        )}
      </div>

      {/* Update/Delete for creator */}
      <div className="event-detail-buttons">
        <Link to={`/update/${id}`} state={{ event }}>
          <button className="edit-button">✏️ Edit</button>
        </Link>
        <button
          className="delete-button"
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this event?')) {
              try {
                await axios.delete(`/event/delete/${id}`);
                alert('✅ Event deleted');
                navigate('/');
              } catch {
                alert('❌ Failed to delete event');
              }
            }
          }}
        >
          🗑 Delete
        </button>
      </div>

      {error && <p className="error-message">❌ {error}</p>}
    </div>
  );
};

export default EventDetail;
