/* eslint-disable no-console */
import React from 'react';
import { compose, withState } from 'recompose';
import { withMiddleware, useReducer, useDevtools } from 'with-middleware';

const logger = store => next => action => {
  console.group('logging middleware');
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const initialState = { count: 0 };

const reducer = (state = initialState, action = {}) => {
  if (action.type === 'INCREMENT') {
    return { count: state.count + 1 };
  }
  if (action.type === 'DECREMENT') {
    return { count: state.count - 1 };
  }
  return state;
};

const enhance = compose(
  withState('store', 'dispatch'),
  withMiddleware('store', 'dispatch', [
    logger,
    useDevtools('desired name'),
    useReducer(reducer)
  ])
);

const Counter = enhance(({ state, dispatch }) => (
  <div>
    Count: {state.count}
    <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
    <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
  </div>
));

export default Counter;
