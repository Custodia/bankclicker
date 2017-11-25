import React, { Component } from 'react';

import EventBar from './EventBar';
import Tabs from './Tabs';

import './Menu.css';

export default class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <Tabs {...this.props} />
        <EventBar
          displayedEvent={this.props.displayedEvent}
          activateModalEvent={this.props.activateModalEvent}
        />
      </div>
    );
  }
}
