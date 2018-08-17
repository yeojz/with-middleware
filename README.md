# recompose-with-middleware

> Adding middleware support to withState from recompose

[![npm][npm-badge]][npm-link]

---

<!-- TOC depthFrom:2 -->

- [About](#about)
- [Installation](#installation)
- [Function Reference](#function-reference)
- [Examples](#examples)
  - [Basic Usage](#basic-usage)
  - [Using withReducers](#using-withreducers)
- [License](#license)

<!-- /TOC -->

## About

`recompose-with-middleware` provides the ability to add middlewares to components
that are decorated with `withState` or `withReducer` higher-order components.

This allows you to quickly re-use some simple middlewares that were written for redux
without the need to use redux if your use case might just require a state within a
parent component.

If you want to use `withReducer` from recompose, there are some caveats.
Please check the usage with `withReducer` section.

## Installation

Install the library via:

```bash
npm install recompose-with-middleware --save
```

## Function Reference

```js
withMiddleware(
  stateName: string,
  stateUpdaterName: string,
  middlewares: Array<Middleware>
): HigherOrderComponent
```

## Examples

### Basic Usage

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

### Using withReducers

```diff
- import { withReducer } from 'recompose';
+ import { withState } from 'recompose';
- import { withMiddleware } from 'recompose-with-middleware';
+ import { withMiddleware, useReducer, useDevtools } from 'recompose-with-middleware';

const initialState = { count: 0 }

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
- withReducer('store', 'dispatch', reducer),
+ withState('store', 'dispatch')
  withMiddleware('store', 'dispatch', [
     middlewareFunction1,
     middlewareFunction2,
+    useDevtools('desired name'), // if you want to use with redux-devtools-extension
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

## License

`recompose-with-middleware` is [MIT licensed](./LICENSE)


[npm-badge]: https://img.shields.io/npm/v/recompose-with-middleware.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/recompose-with-middleware
