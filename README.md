# with-middleware

> Add middleware support to any function prop or withState from recompose

[![npm][npm-badge]][npm-link]
[![Build Status][circle-badge]][circle-link]
[![Coverage Status][codecov-badge]][codecov-link]

---

<!-- TOC depthFrom:2 -->

- [About](#about)
- [Installation](#installation)
- [Function Reference](#function-reference)
  - [withMiddleware](#withmiddleware)
  - [useReducer](#usereducer)
  - [useDevtools](#usedevtools)
- [Examples](#examples)
- [License](#license)

<!-- /TOC -->

## About

`with-middleware` provides the ability to add middleware support (and reducers)
to function props of a component.

The middleware API follows closely to that of `redux`, giving you the ability
to quickly re-use some of the middlewares that were written for redux within a
single component.

This library goes well with the usage of the `withState` higher-order component
from `recompose`. Changes will be required if you're using `withReducer` from `recompose`.

## Installation

Install the library via:

```bash
npm install with-middleware --save
```

## Function Reference

### withMiddleware

```js
import { withMiddleware } from './with-middleware';

withMiddleware(
  stateName: string,
  stateUpdaterName: string,
  middlewares: Array<Middleware>
): HigherOrderComponent
```

### useReducer

```js
import { useReducer } from './with-middleware';

useReducer(
  reducer: Function
): Middleware
```

### useDevtools

```js
import { useDevtools } from './with-middleware';

useDevtools(
  title: string // title shown in redux-devtool-extension console
): Middleware
```

## Examples

- [Basic Usage](./examples/basic-usage/README.md)
- [Using withState](./examples/using-with-state/README.md)
- [Using withReducer](./examples/using-with-reducer/README.md)
- [Redux Emulator](./examples/redux-emulator/README.md)

## License

`with-middleware` is [MIT licensed](./LICENSE)

[npm-badge]: https://img.shields.io/npm/v/with-middleware.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/with-middleware
[circle-badge]: https://img.shields.io/circleci/project/github/yeojz/with-middleware/master.svg?style=flat-square
[circle-link]: https://circleci.com/gh/yeojz/with-middleware
[codecov-badge]: https://img.shields.io/codecov/c/github/yeojz/with-middleware/master.svg?style=flat-square
[codecov-link]: https://codecov.io/gh/yeojz/with-middleware
