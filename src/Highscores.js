import React, { Component } from 'react';

import { API_URL } from './constants';

export default class Highscores extends Component {
  componentDidMount() {
    fetch(`${API_URL}/highscore`).then(response => {
      response.json().then(json => {
        this.setState({ users: json });
      })
    })
  }

  render() {
    if (!this.state) { return (<div />); }

    console.log({state: this.state})
    const children = this.state.users.map(e => (<span>{e.user}</span>));

    return (
      <div>
        {children}
      </div>
    )
  }
}
