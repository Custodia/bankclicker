import React, { Component } from 'react';

import { UPGRADE_COSTS } from './UpgradeCosts';

import './UpgradeButton.css';

export default class UpgradeButton extends Component {
  render() {
    const { disabled } = this.props;
    let { text } = this.props;
    let style = {};
    if (disabled) {
      style.color = "#666";
      text += " (Can't afford)";
    }
    return (
      <div
        className="upgrade-button"
        style={style}
        onClick={!disabled ? this.props.onClick : undefined}
      >
        {text}
      </div>
    );
  }
}
