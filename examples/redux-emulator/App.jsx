/* eslint-disable no-console */
import React from 'react';
import { Provider, createStore, applyMiddleware } from './redux-emulator';
import Counter from './Counter';
import { logger, reducer } from '../shared';

const store = createStore(reducer, applyMiddleware(logger));

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
