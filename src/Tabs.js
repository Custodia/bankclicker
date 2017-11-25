import React, { Component } from 'react';
import UpgradeButton from './UpgradeButton';

import './Tabs.css';

export default class Tabs extends Component {
  state = {
    selectedTab: 'upgrades'
  }
  handleTabSelect(name) {
    this.setState({ selectedTab: name })
  }
  
  render() {
    let activeTab = <div />;
    switch (this.state.selectedTab) {
      case 'upgrades':
        activeTab = <UpgradesTab {...this.props} />;
        break;
    }
    return (
      <div className="TabsBar">
        <TabButtons onClick={this.handleTabSelect.bind(this)} selected={this.state.selectedTab} />
        {activeTab}
      </div>
    )
  }
}

const TabButtons = ({ onClick, selected }) => {
  return (
    <div className="tabButtons">
      <span className={selected === 'upgrades' ? 'active' : ''} onClick={() => onClick('upgrades')}>Upgrades</span>
      <span className={selected === 'hats' ? 'active' : ''} onClick={() => onClick('hats')}>Hats</span>
      <span className={selected === 'stuff' ? 'active' : ''} onClick={() => onClick('stuff')}>Stuff</span>
      <span className={selected === 'things' ? 'active' : ''} onClick={() => onClick('things')}>Things</span>
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
