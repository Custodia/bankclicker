import React, { Component } from 'react';

import UpgradeButton from './UpgradeButton';
import EventBar from './EventBar';
import { UPGRADE_COSTS } from './UpgradeCosts';

import './Menu.css';

const upgrades = [
  {
    id: 'clickPower',
    name: 'Click Power',
    currencyCosts: [1, 2, 5, 10, 20, 50, 100, 1000],
    scoreCosts: [1, 2, 5, 10, 20, 50, 100, 1000]
  },
  {
    id: 'clickCoins',
    name: 'Click Coins',
    currencyCosts: [1, 2, 5, 10, 20, 50, 100, 1000],
    scoreCosts: [1, 2, 5, 10, 20, 50, 100, 1000]
  }
]

export default class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <span className="UpgradeTitle">Upgrades</span>
        {upgrades.map(upgrade => (
          <UpgradeButton
            upgrade={upgrade}
            power={this.props.upgrades[upgrade.id]}
            currency={this.props.currency}
            score={this.props.score}
            onUpgrade={this.props.onUpgrade}
          />
        ))}
        <EventBar activateEvent={this.props.activateModalEvent}/>
      </div>
    );
  }
}
