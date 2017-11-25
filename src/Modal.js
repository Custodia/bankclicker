import React from 'react';

import './Modal.css';

const Modal = props => {
  const content = props.event ? <EventModal {...props} /> : <FriendsModal {...props} />;
  return (
    <div className="modal" onClick={props.onClose}>
      {content}
    </div>
  );
}

const FriendsModal = ({ onClose }) => (
  <div className="friendsModal">
    <h1>Friend Piggies</h1>
  </div>
);

const EventModal = ({ event, onClose }) => (
  <div className="eventModal">
    <h1>{event.title}</h1>
    <span>{event.description}</span>
  </div>
);

export default Modal;