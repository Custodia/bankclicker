import React, { Component } from 'react';
import UpgradeButton from './UpgradeButton';

import './Tabs.css';

export default class Tabs extends Component {
  state = {
    selectedTab: 'upgrades'
  }
  render() {
    // let activeTab;
    // switch (this.state.selectedTab) {
    //   case 'upgrades':
    //     activeTab = <UpgradeTab {...props} />;
    //     break;
    // }
    // const activeTab = null; 
    // return (
    //   <div className="TabButtons">
    //     <span className="TabButton">Upgrades</span>
    //   </div>
    // );
    return (
      <div className="TabsBar">
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
      </div>
    )
  }
}

const TabButtons = ({ activateTab, selectedTab }) => {
  return (
    <div className="tabButtons">
      <span className="tabButton">Upgrades</span>
    </div>
  );
}

const UpgradeTab = ({ upgrades, currency, score, onUpgrade }) => {
  return (
    <div className="UpgradeTab">
      {upgrades.map(upgrade => (
        <UpgradeButton
          upgrade={upgrade}
          power={upgrade.level}
          currency={this.props.currency}
          score={this.props.score}
          onUpgrade={this.props.onUpgrade}
        />
      ))}
    </div>
  )
}
