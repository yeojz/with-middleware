import React from 'react';

function Basic(props) {
  return (
    <div>
      <div className="value">{props.counter}</div>
      <button
        className="increment"
        onClick={() => props.setCounter(n => n + 1)}
      >
        Increment
      </button>
      <button
        className="decretment"
        onClick={() => props.setCounter(n => n - 1)}
      >
        Decrement
      </button>
    </div>
  );
}

export default Basic;
