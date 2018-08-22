/* eslint-disable no-console */
import React from 'react';
import { withMiddleware } from 'with-middleware';
import { logger } from '../shared';

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
      <CounterDisplay
        counter={this.state.counter}
        setCounter={this.setCounter}
      />
    );
  }
}

export default Counter;
