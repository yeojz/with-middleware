/* eslint-disable no-console */
import React from 'react';
import { compose, withState } from 'recompose';
import { withMiddleware, useReducer, useDevtools } from 'with-middleware';
import { logger, initialState, reducer } from '../shared';

const enhance = compose(
  withState('state', 'dispatch', initialState),
  withMiddleware('state', 'dispatch', [
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
