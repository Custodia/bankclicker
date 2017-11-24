import React, { Component } from 'react';

import Pig from './Pig';
import Menu from './Menu';
import Background from './Background';

import './App.css';

export default class App extends Component {
  state = {
    score: 0,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    screenRatio: window.devicePixelRatio || 1,
    context: null,
    upgrades: {
      clickPower: 1,
      investor: {
        level: 1,
        count: 0
      }
    }
  }

  pig;

  componentDidMount() {
    window.addEventListener('resize',  this.handleResize.bind(this, false));
    const context = this.canvas.getContext('2d');
    this.setState({ context: context });
    this.background = new Background(this.state)
    this.pig = new Pig({ context });
    requestAnimationFrame(() => this.update());
  }

  handleResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      screenRatio: window.devicePixelRatio || 1
    });
  };

  handleUpgradeClickPower = cost => {
    const { score, upgrades } = this.state;
    const { clickPower } = upgrades;
    this.setState({
      upgrades: {
        ...upgrades,
        clickPower: clickPower + 1
      },
      score: score - cost
    });
  };

  handleUpgradeWorker = (type, name, cost) => {
    const { score, upgrades } = this.state;
    this.setState({
      upgrades: {
        ...upgrades,
        [name]: {
          ...this.state[name],
          [type]: this.state[name][type] + 1
        }
      },
      score: score - cost
    });
  };

  handleClick = event => this.updateScoreBy(this.state.upgrades.clickPower);

  updateScoreBy = amount => {
    this.setState({ score: this.state.score + amount });
  };

  update() {
    this.background.update(this.state);
    this.pig.update();
    const context = this.state.context;
    context.save();
    context.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
    this.background.render(this.state)
    this.pig.render(this.state);
    context.restore();
    requestAnimationFrame(() => this.update());
  }

  render() {
    return (
      <div className="App">
        <div className="Score">
          {this.state.score}
        </div>
        <canvas
          ref={ref => this.canvas = ref}
          onClick={this.handleClick}
          width={this.state.screenWidth}
          height={this.state.screenHeight}
        />
        <Menu
          onUpgradeClickPower={this.handleUpgradeClickPower}
          onUpgradeWorker={this.handleUpgradeWorker}
          upgrades={this.state.upgrades}
          score={this.state.score}
        />
      </div>
    );
  }
}
