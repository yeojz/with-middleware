# Basic Usage

```js
import React from 'react';
import { compose, withState } from 'recompose';
import withMiddleware from './recompose-with-middleware';

const logger = store => next => action => {
  console.group('logging middleware');
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

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
```
