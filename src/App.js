import React, { Component } from 'react';

import Pig from './Pig';
import Menu from './Menu';
import Background from './Background';
import Coin from './Coin';
import { randomNumBetweenExcluding, randomNumBetween } from './helpers'

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
    window.addEventListener('resize', this.handleResize.bind(this, false));
    const context = this.canvas.getContext('2d');
    this.setState({ context: context });
    this.background = new Background(this.state)
    this.pig = new Pig({ context });
    this.coins = [];
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

  handleClick = (event) => {
    this.updateScoreBy(this.state.upgrades.clickPower);
    this.coins.push(new Coin({
      lifeSpan: randomNumBetween(60, 100),
        size: 8,
        position: {
          x: event.nativeEvent.clientX,
          y: event.nativeEvent.clientY
        },
        velocity: {
          x: event.nativeEvent.clientX <= this.state.screenWidth / 2 ?
            randomNumBetween(0, 5) : randomNumBetween(-5, 0),
          y: randomNumBetween(-10, -5)
        }
    }))
  };

  updateScoreBy = amount => {
    this.setState({ score: this.state.score + amount });
  };

  update() {
    // Update
    this.background.update(this.state);
    this.pig.update();
    const context = this.state.context;
    context.save();
    context.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
    // Render
    this.background.render(this.state)
    this.pig.render(this.state);
    this.coins.forEach(coin => { if (coin.delete) this.coins = this.coins.filter(c => c !== coin); });
    this.coins.forEach(c => c.render(this.state))
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
