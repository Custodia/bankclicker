import React from 'react';

import './EventModal.css';

const EventModal = ({ onClick, event }) => {
  return (
    <div className="eventModal" onClick={onClick}>
      <h1>{event.title}</h1>
      <span>{event.description}</span>
    </div>
  );
}

export default EventModal;