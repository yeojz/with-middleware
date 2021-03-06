# Using withReducer

As there are slight implementation additions, instead of
using `recompose/withReducer` we can achieve the same with
just `recompose/withState` + `useReducer` middleware
from this library.

```diff
import React from 'react';
- import { compose, withReducer } from 'recompose';
+ import { compose, withState } from 'recompose';
+ import { withMiddleware, useReducer, useDevtools } from 'with-middleware';
import { logger, initialState, reducer } from '../shared';

const enhance = compose(
- withReducer('store', 'dispatch', reducer),
+ withState('store', 'dispatch'),
  withMiddleware('store', 'dispatch', [
     middlewareFunction1,
     middlewareFunction2,
+    useDevtools('desired name'), // integration with redux-devtools-extension
+    useReducer(reducer) // should be the last middleware
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
```

To run example, please refer to [examples/README.md](../README.md)
