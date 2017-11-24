import React, { Component } from 'react';

import Pig from './Pig';
import Background from './Background';

import './App.css';

class App extends Component {
  state = {
    score: 0,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    context: null
  }

  pig;

  componentDidMount() {
    window.addEventListener('resize',  this.handleResize.bind(this, false));
    const context = this.canvas.getContext('2d');
    this.setState({ context: context });
    this.background = new Background({ context })
    this.pig = new Pig({ context })
    requestAnimationFrame(() => this.update());
  }
  update() {
    console.log('updated')
    this.pig.update();
    const context = this.state.context;
    context.save();
    context.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
    this.background.render(this.state)
    this.pig.render(this.state);
    context.restore();
    requestAnimationFrame(() => this.update());
  }
  handleResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    }
  )}
  handleClick = event => {
    if (event.region = 'pig') {
      this.setState({ score: this.state.score + 1 });
    }
  }
  render() {
    return (
      <div className="App">
        <div className="Score">
          {this.state.score}
        </div>
        <canvas
          ref={ref => this.canvas = ref }
          onClick={this.handleClick}
          width={this.state.screenWidth}
          height={this.state.screenHeight}
        />
      </div>
    );
  }
}

export default App;
