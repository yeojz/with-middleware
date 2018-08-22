/* eslint-disable no-console,react/prop-types */
import React from 'react';
import { connect } from './redux-emulator';

function Counter(props) {
  return (
    <div>
      Count: {props.counter}
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.decrement}>Decrement</button>
    </div>
  );
}

const mapStateToProps = state => ({
  counter: state.count
});

const mapDispatchToProps = {
  increment: () => ({ type: 'INCREMENT' }),
  decrement: () => ({ type: 'DECREMENT' })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
