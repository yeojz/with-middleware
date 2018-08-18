# recompose-with-middleware

> Adding middleware support to withState from recompose

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

- [Basic Usage](./examples/basic-usage)
- [Using withReducer](./examples/with-reducer)

## License

`recompose-with-middleware` is [MIT licensed](./LICENSE)

[npm-badge]: https://img.shields.io/npm/v/recompose-with-middleware.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/recompose-with-middleware
