import React, { Component } from 'react';

import './UpgradeButton.css';

export default class UpgradeButton extends Component {
  render() {
    const {upgrade, onUpgrade, currency, score} = this.props;
    const scoreCost = upgrade.scoreCosts[upgrade.level - 1];
    const currencyCost = upgrade.currencyCosts[upgrade.level - 1];
    const isAffordable = currency >= currencyCost && score >= scoreCost;
    let style = {};
    if (!isAffordable) {
      style.color = "#7a7a7a";
    }
    const onClick = isAffordable ? () => onUpgrade(currencyCost, scoreCost, upgrade.id) : null;
    return (
      <div
        className="upgrade-button"
        style={style}
        onClick={onClick}
      >
        <span>{upgrade.name + ` ${upgrade.level} lvl`}</span>
      </div>
    );
  }
}
