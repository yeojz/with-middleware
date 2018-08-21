/* eslint-disable no-console */
import React from 'react';
import { withMiddleware } from './with-middleware';

// logger from:
// https://github.com/reduxjs/redux/blob/bebd067fed678de1926a76284ebaf4373c6b2769/docs/advanced/Middleware.md#seven-examples
const logger = store => next => action => {
  console.group('logging middleware');
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const enhance = withMiddleware('counter', 'setCounter', [logger]);

const CounterDisplay = enhance(({ counter, setCounter }) => (
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
));

class Counter extends React.Component {
  state = {
    counter: 0
  };

  setCounter = value => {
    this.setState({ counter: value });
  };

  render() {
    return (
      <Counter counter={this.state.counter} setCounter={this.setCounter} />
    );
  }
}

export default Counter;
