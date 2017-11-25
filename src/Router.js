import React from 'react';
import { Switch, Route } from 'react-router-dom'

import App from './App';
import Bank from './Bank/Bank';

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/verkkopankki' component={Bank}/>
    </Switch>
    );
  }
}
