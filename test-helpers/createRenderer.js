import React from 'react';
import { compose, withState } from 'recompose';
import { render } from 'react-testing-library';
import withMiddleware from '../src/withMiddleware';

function createRenderer(BaseComponent) {
  return (stateName, stateUpdaterName, initialState, middlewares = []) => {
    const Component = compose(
      withState(stateName, stateUpdaterName, initialState),
      withMiddleware(stateName, stateUpdaterName, middlewares)
    )(BaseComponent);

    return render(<Component />);
  };
}

export default createRenderer;
