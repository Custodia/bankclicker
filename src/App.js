import React, { Component } from 'react';

import Pig from './Pig';
import Menu from './Menu';
import Background from './Background';
import Coin from './Coin';
import EventModal from './EventModal';
import { randomNumBetween } from './helpers'

import './App.css';

export default class App extends Component {
  state = {
    score: 0,
    currency: 0,
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
    },
    modalEvent: null
  }

  pig;

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
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
    const { currency, upgrades } = this.state;
    const { clickPower } = upgrades;
    this.setState({
      upgrades: {
        ...upgrades,
        clickPower: clickPower + 1
      },
      currency: currency - cost
    });
  };

  handleUpgradeWorker = (type, name, cost) => {
    const { currency, upgrades } = this.state;
    this.setState({
      upgrades: {
        ...upgrades,
        [name]: {
          ...this.state[name],
          [type]: this.state[name][type] + 1
        }
      },
      currency: currency - cost
    });
  };

  handleClick = (event) => {
    this.coins.push(new Coin({
      lifeSpan: randomNumBetween(60, 100),
        size: 5 + this.state.upgrades.clickPower,
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

  handleCurrencyClick = event => this.setState({ currency: this.state.currency + 1 });
  
  handleEventModalClick = () => {
    this.setState({ activateModalEvent: null })
  }

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
    this.coins.forEach(coin => {
      if (coin.delete) {
        this.updateScoreBy(this.state.upgrades.clickPower);
        this.coins = this.coins.filter(c => c !== coin);
      }
    });
    this.coins.forEach(c => c.render(this.state))
    this.pig.render(this.state);
    context.restore();
    requestAnimationFrame(() => this.update());
  }

  render() {
    return (
      <div className="App">
        {this.state.activateModalEvent ? <EventModal event={this.state.activateModalEvent} onClick={this.handleEventModalClick}/> : null}
        <div className="Score">
          <span>{this.state.score}</span>
        </div>
        <div className="Currency" onClick={this.handleCurrencyClick}>
          <span className="InfoText">Currency: </span>
          <span>{this.state.currency}</span>
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
          currency={this.state.currency}
          activateModalEvent={e => this.setState({ activateModalEvent: e })}
        />
      </div>
    );
  }
}
