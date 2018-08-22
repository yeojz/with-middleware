/* eslint-disable no-console */
import React from 'react';
import { Provider, createStore } from './redux-emulator';
import Counter from './Counter';
import { logger, reducer } from '../shared';

const store = createStore(reducer, [logger]);

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
