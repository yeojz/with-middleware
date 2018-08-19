/* eslint-disable react/prop-types */

import React from 'react';

function Basic(props) {
  return (
    <div>
      <div data-testid="value">{props.counter}</div>
      <button
        data-testid="increment"
        onClick={() => props.setCounter(n => n + 1)}
      >
        Increment
      </button>
      <button
        data-testid="decrement"
        onClick={() => props.setCounter(n => n - 1)}
      >
        Decrement
      </button>
    </div>
  );
}

export default Basic;
