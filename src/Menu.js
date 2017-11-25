import React, { Component } from 'react';

import UpgradeButton from './UpgradeButton';
import EventBar from './EventBar';

import './Menu.css';

export default class Menu extends Component {
  render() {
    return (
      <div className="menu">
      <span className="UpgradeTitle">Upgrades</span>
      {Object.keys(this.props.upgrades).map(key => {
        const upgrade = this.props.upgrades[key];
        return (
          <UpgradeButton
            upgrade={upgrade}
            currency={this.props.currency}
            score={this.props.score}
            onUpgrade={this.props.onUpgrade}
          />
        );
      })}

        <EventBar
          displayedEvent={this.props.displayedEvent}
          activateModalEvent={this.props.activateModalEvent}
        />
      </div>
    );
  }
}