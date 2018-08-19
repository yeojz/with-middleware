import { BATCH_ACTION, SET_ACTION } from './constants';

function batchAction(reducer, store, next, action) {
  const state = action.payload.reduce(
    (nextState, current) => reducer(nextState, current),
    action.state || store.getState()
  );

  return next(state);
}

function useReducer(reducer) {
  if (typeof reducer !== 'function') {
    throw new Error(
      `Expecting argument 1 of "useReducer" to be a function. ${typeof reducer} given.`
    );
  }

  return store => next => action => {
    if (action.type === BATCH_ACTION) {
      return batchAction(reducer, store, next, action);
    }

    if (action.type === SET_ACTION) {
      return next(action.payload);
    }

    const state = reducer(store.getState(), action);
    return next(state);
  };
}

export default useReducer;
