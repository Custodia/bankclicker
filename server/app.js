const expressRedux = require('express-redux').default;
const reducer = require('./reducer');
const { createStore } =  require('redux');
const { Map } = require('immutable');

const express = require('express');
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

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const increment = Math.floor(randNumber(5, 10));
  const user = req.query.user || 'john';
  let userData = res.getStore().getState().getIn(['users', user])
  if (!userData) {
    userData = Map({ currency: 0 })
    res.dispatch({
      type: 'CREATE USER',
      user
    })
  }
  res.dispatch({
    type: 'REFRESH',
    user,
    increment
  });
  res.send(JSON.stringify({currency: userData.get('currency'), increment}));
});

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
