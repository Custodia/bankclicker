const expressRedux = require('express-redux').default;
const { createStore } =  require('redux');

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const rootReducer = (state, action) => {
    if (state === undefined) { return 0; }
    return state + 1;
}
const middlewares = [];
const store = createStore(rootReducer, ...middlewares);

const storeCreator = (req, res) => {
	// do something with req, res if you need to
	return store;
}

app.use(expressRedux(storeCreator));

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.dispatch({ type: 'SOMETHING' });
  res.send(JSON.stringify({ a: res.getStore().getState() }));
});

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
