import React, { Component } from 'react';

import './EventBar.css';

const events = [
  {
    name: 'Made investment'
  }
]

const EventBar = ({activateEvent}) => {
  return (
    <div className="eventBar">
    <span>EVENTS</span>
    {events.map(event => <EventButton name={event.name} onClick={() => activateEvent(event)} />)}
    </div>
  );
}

const EventButton = ({name, onClick}) => {
  return (
    <div className="eventButton" onClick={onClick}>
      <span>{name}</span>
    </ div>
  );
}

export default EventBar;