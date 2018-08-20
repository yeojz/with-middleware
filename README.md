# with-middleware

> Add middleware support to any function prop or withState from recompose

[![npm][npm-badge]][npm-link]

---

<!-- TOC depthFrom:2 -->

- [About](#about)
- [Installation](#installation)
- [Function Reference](#function-reference)
- [Examples](#examples)
- [License](#license)

<!-- /TOC -->

## About

`with-middleware` provides the ability to add middleware support to prop functions.
As such this library also goes well with the usage of the `withState` higher-order
component from `recompose`

The API follows closely with that of `redux`, giving you the ability to quickly re-use
some of the middlewares that were written for redux in a single component.

If you want to use `withReducer` from `recompose`, there are some caveats listed in the examples section.

## Installation

Install the library via:

```bash
npm install with-middleware --save
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

- [Basic Usage](./examples/basic-usage)
- [Using withReducer](./examples/with-reducer)

## License

`recompose-with-middleware` is [MIT licensed](./LICENSE)

[npm-badge]: https://img.shields.io/npm/v/recompose-with-middleware.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/recompose-with-middleware
