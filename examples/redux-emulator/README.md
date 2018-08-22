# Redux Emulator

`with-middleware` is intended to bring the ability of adding redux-like
middlewares to a component function prop.

However, with this `proof-of-concept`, it extends the implementation to
a full redux-like store using React 16's [Context API](https://reactjs.org/docs/context.html)

- `redux-emulator.js` - contains the redux style methods.
- `App.jsx` - creating the store
- `Counter.jsx` - A sample connected component
