import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './CreateEvent.css';

const CreateEvent = ({ isUpdate = false }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [datetime, setDatetime] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const locationObj = useLocation();
  const passedEvent = locationObj.state?.event;

  // ✅ Use passed event instead of fetching
  useEffect(() => {
    if (isUpdate && passedEvent) {
      setName(passedEvent.Name || passedEvent.name);
      setDescription(passedEvent.Description || passedEvent.description);
      setLocation(passedEvent.Location || passedEvent.location);
      setDatetime(
        new Date(passedEvent.DateTime || passedEvent.datetime)
          .toISOString()
          .slice(0, 16)
      );
    }
  }, [isUpdate, passedEvent]);

  // ✅ Submit updated or new event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Name: name,
      Description: description,
      Location: location,
      DateTime: new Date(datetime).toISOString(),
    };

    try {
      if (isUpdate) {
        await axios.put(`/event/update/${id}`, payload);
        alert('✅ Event updated successfully!');
      } else {
        await axios.post('/event', payload);
        alert('✅ Event created successfully!');
      }
      navigate('/');
    } catch (err) {
      console.error('Error submitting event:', err);
      if (err.response?.status === 401) {
        alert('🔒 Please log in to perform this action.');
      } else if (err.response?.status === 403) {
        alert('❌ You are not allowed to update this event.');
      } else {
        alert('❌ Failed to submit the event.');
      }
    }
  };

  // ✅ Delete event
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/event/delete/${id}`);
        alert('✅ Event deleted successfully!');
        navigate('/');
      } catch (err) {
        console.error('Error deleting event:', err);
        if (err.response?.status === 403) {
          alert('❌ You are not allowed to delete this event.');
        } else {
          alert('❌ Failed to delete the event.');
        }
      }
    }
  };

return (
  <div className="event-form-container">
    <h2>{isUpdate ? 'Update Event' : 'Create New Event'}</h2>
    <form onSubmit={handleSubmit}>
      <label>Event Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter event name"
        required
      />

      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter short description"
        required
      />

      <label>Location</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter event location"
        required
      />

      <label>Date & Time</label>
      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
        required
      />

      <div className="button-group">
        <button type="submit" className="submit-button">
          {isUpdate ? 'Update Event' : 'Create Event'}
        </button>

        {isUpdate && (
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Delete Event
          </button>
        )}
      </div>
    </form>
  </div>
);
};

export default CreateEvent;
