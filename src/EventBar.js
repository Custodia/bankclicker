import React, {Component} from 'react';

import { randomNumBetween } from './helpers'
import './EventBar.css';

export default class EventBar extends Component {
  state = {
    displayedEvent: ({
      title: 'Made investment',
      description: 'lorem ipsum...',
      coinValue: randomNumBetween(5, 15),
      currencyValue: randomNumBetween(0, 5)
    }),
    events: [
      {
        title: 'Got interest',
        description: 'lorem ipsum...',
        coinValue: randomNumBetween(5, 15),
        currencyValue: randomNumBetween(0, 5)
      },
      {
        title: 'Friend level upped',
        description: 'lorem ipsum...',
        coinValue: randomNumBetween(5, 15),
        currencyValue: randomNumBetween(0, 5)
      }
    ]
  }
  handleClick() {
    const events = this.state.events;
    this.setState({
      displayedEvent: events.pop(),
      events: events
    });
    this.props.activateEvent(this.state.displayedEvent)
  }

  render() {
    const eventButton = this.state.displayedEvent ? <EventButton
      event={this.state.displayedEvent}
      onClick={() => this.handleClick()}
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
