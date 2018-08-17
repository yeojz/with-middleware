function applyReducers(reducers) {
  if (typeof reducers === 'function') {
    return reducers;
  }

  return (state, action) => {
    return Object.keys(reducers).reduce((newState, name) => {
      newState[name] = reducers[name](state[name], action);
      return newState;
    }, {});
  };
}

function useReducer(fn) {
  const reducer = applyReducers(fn);

  return store => next => action => {
    if (action.__devtools__) {
      action.__devtools__(next, reducer);
      return;
    }

    const state = reducer(store.getState(), action);
    next(state);
    return action;
  };
}

export default useReducer;
