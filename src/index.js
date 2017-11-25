import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <Router />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
