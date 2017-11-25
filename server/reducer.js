const { Map } = require('immutable');

const initialUserData = {
  score: 0,
  currency: 0,
  increment: 0,
  upgrades: {},
  styles: {}
}

const initialState = Map({
  users: Map({
    kate: Map({
      score: 0,
      currency: 0,
      increment: 0,
      upgrades: {},
      styles: {}
    }),
    austin: Map({
      score: 10
      currency: 0,
      increment: 0,
      upgrades: {},
      styles: {}
    })
  })
})

var reducer = function(state, action) {
  if (state === undefined) { return reducer(initialState, action) };
  switch (action.type) {
    case 'CREATE USER': {
      return state.setIn(['users', action.user], Map(initialUserData))
    }

    case 'REFRESH': {
      return state.setIn(['users', action.user, 'increment'], 0);
    }

    case 'BUY': {
      return state.setIn(['users', action.user, 'increment'], state.getIn(['users', action.user, 'increment']) + action.increment);
    }

    case 'SAVE': {
      return state.setIn(['users', action.user], Map({
        score: action.score,
        currency: action.currency,
        upgrades: action.upgrades,
        styles: action.styles
      }))
    }

    default:
      return state
  }
}

module.exports = reducer;
