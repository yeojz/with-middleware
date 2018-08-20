/* eslint-disable react/prop-types */
import React from 'react';

function Dispatch(props) {
  return (
    <div>
      <div data-testid="value">{props.state.count}</div>
      <button
        data-testid="increment"
        onClick={() => props.dispatch({ type: 'INCREMENT' })}
      >
        Increment
      </button>
      <button
        data-testid="decrement"
        onClick={() => props.dispatch({ type: 'DECREMENT' })}
      >
        Decrement
      </button>
    </div>
  );
}

export default Dispatch;
