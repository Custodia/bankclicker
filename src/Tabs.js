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
        <UpgradesTab {...this.props} />
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

const UpgradesTab = ({ upgrades, currency, score, onUpgrade }) => {
  return (
    <div className="UpgradeTab">
      {Object.keys(upgrades).map(key => {
        const upgrade = upgrades[key];
        return (
          <UpgradeButton
          upgrade={upgrade}
          currency={currency}
          score={score}
          onUpgrade={onUpgrade}
          />
        );
      })}
    </div>
  )
}
