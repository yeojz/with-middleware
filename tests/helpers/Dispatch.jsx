import React from 'react';

function Dispatch(props) {
  return (
    <div>
      <div className="value">{props.state.count}</div>
      <button
        className="increment"
        onClick={() => props.dispatch({ type: 'INCREMENT' })}
      >
        Increment
      </button>
      <button
        className="decretment"
        onClick={() => props.dispatch({ type: 'DECREMENT' })}
      >
        Decrement
      </button>
    </div>
  );
}

export default Dispatch;
