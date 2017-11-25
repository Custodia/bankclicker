import React, { Component } from 'react';

import UpgradeButton from './UpgradeButton';
import EventBar from './EventBar';
import { UPGRADE_COSTS } from './UpgradeCosts';

import './Menu.css';

export default class Menu extends Component {
  render() {
    const { currency, upgrades } = this.props;
    const { clickPower } = upgrades;
    const clickPowerUpgradeCost = UPGRADE_COSTS.clickPower[clickPower - 1];
    const clickPowerUpgradeAffordable = currency >= clickPowerUpgradeCost;
    return (
      <div className="menu">
        <UpgradeButton
          text={`Upgrade Click Power (Cost: ${clickPowerUpgradeCost})`}
          disabled={!clickPowerUpgradeAffordable}
          onClick={() => this.props.onUpgradeClickPower(clickPowerUpgradeCost)}
        />
        <EventBar activateEvent={this.props.activateModalEvent}/>
      </div>
    );
  }
}
