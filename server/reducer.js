const { Map } = require('immutable');

const initialState = Map({
  users: Map({})
})

initialUserData = Map({
  currency: 0,
  increment: 0
})

var reducer = function(state, action) {
  if (state === undefined) { return reducer(initialState, action) };
  switch (action.type) {
    case 'CREATE USER': {
      return state.setIn(['users', action.user], initialUserData)
    }

    case 'REFRESH': {
      return state.setIn(['users', action.user, 'increment'], 0);
    }

    case 'BUY': {
      return state.setIn(['users', action.user, 'increment'], state.getIn(['users', action.user, 'increment']) + action.increment);
    }

    default:
      return state
  }
}

module.exports = reducer;
