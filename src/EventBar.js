import React, {Component} from 'react';

import './EventBar.css';

export default class EventBar extends Component {
  render() {
    const eventButton = this.props.displayedEvent ? <EventButton
      event={this.props.displayedEvent}
      onClick={() => this.props.activateModalEvent()}
    /> : null;
    return (
      <div className="eventBar">
        <span>{eventButton ? 'EVENTS' : 'NO EVENTS'}</span>
        {eventButton}
      </div>
    );
  }
}

const EventButton = ({event, onClick}) => {
  return (
    <div className="eventButton" onClick={onClick}>
      <span>{event.title}</span>
    </div>
  );
}
