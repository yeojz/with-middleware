/* eslint-disable no-console */
import React from 'react';
import { compose, withState } from 'recompose';
import { withMiddleware } from 'with-middleware';
import { logger } from '../shared';

const enhance = compose(
  withState('counter', 'setCounter', 0),
  withMiddleware('counter', 'setCounter', [logger])
);

const Counter = enhance(({ counter, setCounter }) => (
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
));

export default Counter;
