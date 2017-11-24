import React, { Component } from 'react';

import Pig from './Pig';
import Background from './Background';

import './App.css';

export default class App extends Component {
  state = {
    score: 0,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    screenRatio: window.devicePixelRatio || 1,
    context: null
  }

  pig;

  componentDidMount() {
    window.addEventListener('resize',  this.handleResize.bind(this, false));
    const context = this.canvas.getContext('2d');
    this.setState({ context: context });
    this.background = new Background({ context })
    this.pig = new Pig({ context });
    requestAnimationFrame(() => this.update());
  }

  handleResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      screenRatio: window.devicePixelRatio || 1
    }
  )};

  handleClick = event => this.setState({ score: this.state.score + 1 });

  update() {
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
      </div>
    );
  }
}
