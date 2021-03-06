const expressRedux = require('express-redux').default;
const reducer = require('./reducer');
const { createStore } =  require('redux');
const { Map } = require('immutable');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

const middlewares = [];
const store = createStore(reducer, ...middlewares);

const storeCreator = (req, res) => {
	// do something with req, res if you need to
	return store;
}

app.use(expressRedux(storeCreator));

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

function randNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyParser.json());

app.get('/api/highscore', (req, res) => {
  const result =
    res
      .getStore().getState().get('users')
      .sortBy(value => value.get('score'), (a, b) => a < b).take(10).reduce((acc, e, k) => acc.concat({
        user: k,
        score: e.get('score'),
        currency: e.get('currency'),
        increment: e.get('increment'),
        upgrades: e.get('upgrades'),
        styles: e.get('styles')
      }), []);
  res.send(JSON.stringify(result));
});

app.get('/api/buy', (req, res) => {
  const increment = 1
  const user = req.query.user || 'john';
	console.log(user)
  let userData = res.getStore().getState().getIn(['users', user])
  if (!userData) {
    res.dispatch({
      type: 'CREATE USER',
      user
    })
  }
  res.dispatch({
    type: 'BUY',
    user,
    increment
  });
	res.send()
});

app.post('/api', (req, res) => {
  res.dispatch({
    type: "SAVE",
    user: req.body.user || 'john',
    score: req.body.score,
		currency: req.body.currency,
    upgrades: req.body.upgrades,
    styles: req.body.styles
  });
  res.end("yes");
});

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const user = req.query.user || 'john';
  let userData = res.getStore().getState().getIn(['users', user]);
  if (!userData) {
    res.dispatch({
      type: 'CREATE USER',
      user
    });
    userData = res.getStore().getState().getIn(['users', user]);
  }
  res.dispatch({
    type: 'REFRESH',
    user
  });
  res.send(JSON.stringify({
    score: userData.get('score'),
    currency: userData.get('currency'),
    increment: userData.get('increment'),
    upgrades: userData.get('upgrades'),
    styles: userData.get('styles')
  }));
});

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
