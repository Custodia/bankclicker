import React, { Component } from 'react';

import Pig from './Pig';
import Menu from './Menu';
import Background from './Background';
import Coin from './Coin';
import EventModal from './EventModal';
import { randomNumBetween } from './helpers'
import { API_URL } from './constants';

import './App.css';

export default class App extends Component {
  state = {
    score: 100,
    currency: 100,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    screenRatio: window.devicePixelRatio || 1,
    context: null,
    upgrades: {
      clickPower: {
        id: 'clickPower',
        name: 'Power',
        level: 1,
        currencyCosts: [1, 2, 5, 10, 20, 50, 100, 1000],
        scoreCosts: [1, 2, 5, 10, 20, 50, 100, 1000]
      },
      clickCoins: {
        id: 'clickCoins',
        name: 'Coins',
        level: 1,
        currencyCosts: [1, 2, 5, 10, 20, 50, 100, 1000],
        scoreCosts: [1, 2, 5, 10, 20, 50, 100, 1000]
      }
    },
    styles: {
      hat: {
        id: 'hat',
        name: 'Hat',
        level: 1,
        currencyCosts: [1, 2, 5, 10, 20, 50, 100, 1000],
        scoreCosts: [1, 2, 5, 10, 20, 50, 100, 1000]
      },
      cigar: {
        id: 'cigar',
        name: 'Cigar',
        level: 1,
        currencyCosts: [1, 2, 5, 10, 20, 50, 100, 1000],
        scoreCosts: [1, 2, 5, 10, 20, 50, 100, 1000]
      },
      pants: {
        id: 'pants',
        name: 'Pants',
        level: 1,
        currencyCosts: [1, 2, 5, 10, 20, 50, 100, 1000],
        scoreCosts: [1, 2, 5, 10, 20, 50, 100, 1000]
      }
    },
    modalEvent: null,
    displayedEvent: ({
      title: 'Made investment',
      description: 'lorem ipsum...',
      coinValue: Math.floor(randomNumBetween(5, 15)),
      currencyValue: Math.floor(randomNumBetween(0, 10))
    }),
    events: [
      {
        title: 'Got interest',
        description: 'lorem ipsum...',
        coinValue: Math.floor(randomNumBetween(5, 15)),
        currencyValue: Math.floor(randomNumBetween(0, 10))
      },
      {
        title: 'Friend level upped',
        description: 'lorem ipsum...',
        coinValue: Math.floor(randomNumBetween(5, 15)),
        currencyValue: Math.floor(randomNumBetween(0, 10))
      }
    ]
  }

  pig;

  componentDidMount() {
    fetch(API_URL).then((response) => {
      response.json().then((json) => {
        const newEvents = this.state.events.concat([{
          title: "You've earned interest!",
          description: "You're investments have earned interest, here's your daily bonus!",
          coinValue: 100,
          currencyValue: json.increment
        }]);
        this.setState({
          score: json.score,
          currency: json.currency,
          upgrades: { ...this.state.upgrades, ...json.upgrades },
          events: newEvents
        });
      });
    });
    window.addEventListener('resize', this.handleResize);
    const context = this.canvas.getContext('2d');
    this.setState({ context: context });
    this.background = new Background(this.state)
    this.pig = new Pig({ context });
    this.coins = [];
    requestAnimationFrame(() => this.update());
  }

  saveGame() {
    setTimeout(() => {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 'john',
          score: this.state.score,
          currency: this.state.currency,
          upgrades: this.state.upgrades
        })
      })
    }, 0);
  }

  handleResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      screenRatio: window.devicePixelRatio || 1
    });
  };

  handleUpgrade = (currencyCost, scoreCost, targetUpgrade) => {
    const { currency, upgrades, score } = this.state;
    upgrades[targetUpgrade].level += 1;
    this.setState({
      upgrades,
      currency: currency - currencyCost,
      score: score - scoreCost
    });
    this.saveGame();
  }
  
  handleStyling = (currencyCost, scoreCost, targetUpgrade) => {
    const { currency, styles, score } = this.state;
    styles[targetUpgrade].level += 1;
    this.setState({
      styles,
      currency: currency - currencyCost,
      score: score - scoreCost
    });
    this.saveGame();
  }

  handleClick = (event) => {
    for(var i = 0; i < this.state.upgrades.clickCoins.level; i++) {
      this.coins.push(new Coin({
        size: 5 + this.state.upgrades.clickPower.level,
        position: {
          x: event.nativeEvent.clientX,
          y: event.nativeEvent.clientY
        },
        velocity: {
          x: randomNumBetween(-10, 10),
          y: randomNumBetween(-20, -10)
        }
      }))
    }
  };

  handleEventModalClick = () => {
    const event = this.state.activateModalEvent;
    if (!event) return;
    this.setState({ activateModalEvent: null, currency: this.state.currency + Math.floor(event.currencyValue) });
    const xTarget = this.state.screenWidth / 2 + 20;
    const yTarget = this.state.screenHeight / 4;
    if (event.currencyValue) {
      this.setState({ currency: this.state.currency + event.currencyValue });
    }
    for(var i = 0; i < event.coinValue; i++) {
      this.coins.push(new Coin({
        size: 5 + this.state.upgrades.clickPower.level,
        position: {
          x: xTarget,
          y: yTarget
        },
        velocity: {
          x: randomNumBetween(-10, 10),
          y: randomNumBetween(-30, -20)
        }
      }));
    }
    this.saveGame();
  }

  handleEventButtonClick = () => {
    const events = this.state.events;
    const displayedEvent = events.pop();
    this.setState({
      displayedEvent: displayedEvent,
      events: events,
      activateModalEvent: this.state.displayedEvent
    });
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
        this.updateScoreBy(this.state.upgrades.clickPower.level);
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
        <div className="Currency" >
          <span className="CurrencyText">currency</span>
          <span className="CurrencyValue">{this.state.currency}</span>
        </div>
        <canvas
          ref={ref => this.canvas = ref}
          onClick={this.handleClick}
          width={this.state.screenWidth}
          height={this.state.screenHeight}
        />
        <Menu
          onStyling={this.handleStyling}
          styles={this.state.styles}
          onUpgrade={this.handleUpgrade}
          upgrades={this.state.upgrades}
          currency={this.state.currency}
          score={this.state.score}
          activateModalEvent={this.handleEventButtonClick}
          displayedEvent={this.state.displayedEvent}
        />
      </div>
    );
  }
}
