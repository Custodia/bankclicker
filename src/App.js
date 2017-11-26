import React, { Component } from 'react';

import Pig from './Pig';
import Menu from './Menu';
import Background from './Background';
import Coin from './Coin';
import Modal from './Modal';
import { randomNumBetween } from './helpers'

import './App.css';

const DEFAULT_COST = [1, 2, 5, 10, 20, 50, 100, 1000, 2000, 5000, 10000, 50000, 100000, 200000];

class UserSelectModal extends Component {
  state = {
    text: ''
  }

  handleChange = event => this.setState({ text: event.target.value });

  handleKeyDown = e => e.keyCode === 13 ? this.props.onSubmit(this.state.text) : null;

  render() {
    return (
      <div>
        <div className="UserSelectModalBackground" />
        <div className="UserSelectModalContainer">
          <span>User:</span>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <button onClick={() => this.props.onSubmit(this.state.text)}>Ok</button>
        </div>
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    user: null,
    score: 0,
    currency: 0,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    screenRatio: window.devicePixelRatio || 1,
    context: null,
    upgrades: {
      clickPower: {
        id: 'clickPower',
        name: 'Power',
        level: 1,
        currencyCosts: DEFAULT_COST,
        scoreCosts: DEFAULT_COST
      },
      clickCoins: {
        id: 'clickCoins',
        name: 'Coins',
        level: 1,
        currencyCosts: DEFAULT_COST,
        scoreCosts: DEFAULT_COST
      }
    },
    styles: {
      hat: {
        id: 'hat',
        name: 'Hat',
        level: 1,
        currencyCosts: DEFAULT_COST,
        scoreCosts: DEFAULT_COST
      },
      cigar: {
        id: 'cigar',
        name: 'Cigar',
        level: 1,
        currencyCosts: DEFAULT_COST,
        scoreCosts: DEFAULT_COST
      },
      pants: {
        id: 'pants',
        name: 'Pants',
        level: 1,
        currencyCosts: DEFAULT_COST,
        scoreCosts: DEFAULT_COST
      }
    },
    friends: [
      {
        name: 'Kate',
        styles: {
          hat: {
            level: 1
          },
          cigar: {
            level: 1,
          },
          pants: {
            level: 1,
          }
        }
      },
      {
        name: 'Kane',
        styles: {
          hat: {
            level: 2
          },
          cigar: {
            level: 2,
          },
          pants: {
            level: 2,
          }
        }
      },
      {
        name: 'Billy',
        styles: {
          hat: {
            level: 3
          },
          cigar: {
            level: 3,
          },
          pants: {
            level: 3,
          }
        }
      }
    ],
    friendsModalOpen: false,
    modalEvent: null,
    displayedEvent: ({
      title: 'Made investment',
      description: 'You made an investment in the online bank which netted you some currency!',
      coinValue: Math.floor(randomNumBetween(5, 25)),
      currencyValue: Math.floor(randomNumBetween(0, 10))
    }),
    events: [
      {
        title: 'Got interest',
        description: "You earned interest from your investments! Have a gift!",
        coinValue: Math.floor(randomNumBetween(5, 35)),
        currencyValue: Math.floor(randomNumBetween(0, 10))
      },
      {
        title: 'Friend level upped',
        description: 'Your friend just level upped! Check their pig at the friends tab!',
        coinValue: Math.floor(randomNumBetween(5, 15)),
        currencyValue: Math.floor(randomNumBetween(0, 10))
      }
    ]
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

  fetchData(user) {
    fetch(`./api?user=${user}`).then((response) => {
      response.json().then((json) => {
        const newEvents = this.state.events.concat([{
          title: "You've earned interest!",
          description: "Your investments have earned interest, here's your daily bonus!",
          coinValue: 100,
          currencyValue: json.increment
        }]);
        this.setState({
          score: json.score,
          currency: json.currency,
          upgrades: { ...this.state.upgrades, ...json.upgrades },
          styles: { ...this.state.styles, ...json.styles },
          events: newEvents
        });
      });
    });
  }

  saveGame() {
    setTimeout(() => {
      const flyingCoinsValue = this.state.upgrades.clickPower.level * this.coins.length;
      fetch("./api", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: this.state.user,
          score: this.state.score + flyingCoinsValue,
          currency: this.state.currency,
          upgrades: this.state.upgrades,
          styles: this.state.styles
        })
      });
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
    const event = this.state.activeModalEvent;
    if (!event) return;
    this.setState({ activeModalEvent: null, currency: this.state.currency + Math.floor(event.currencyValue) });
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
      activeModalEvent: this.state.displayedEvent
    });
  }

  handleFriendsModalOpen = () => {
    this.setState({ friendsModalOpen: true });
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

  handleSetUser = user => {
    console.log(user)
    this.setState({ user });
    this.fetchData(user);
  }

  renderUserModal() {
    if (this.state.user) return null;
    return (
      <UserSelectModal
        onSubmit={this.handleSetUser}
      />
    );
  }

  render() {
    const modal = (this.state.activeModalEvent && <Modal event={this.state.activeModalEvent} onClose={this.handleEventModalClick}/>) ||
      (this.state.friendsModalOpen && <Modal friends={this.state.friends} onClose={() => this.setState({ friendsModalOpen: false })}/>);
    return (
      <div className="App">
        {this.renderUserModal()}
        {modal}
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
          openFriendsModal={this.handleFriendsModalOpen}
        />
      </div>
    );
  }
}
