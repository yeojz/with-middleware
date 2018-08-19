import React from 'react';
import { compose, withState } from 'recompose';
import { render, cleanup, fireEvent } from 'react-testing-library';
import useReducer from './useReducer';
import withMiddleware from './withMiddleware';
import Basic from '../tests/helpers/Basic';
import Dispatch from '../tests/helpers/Dispatch';
import reducer from '../tests/helpers/reducer';

function createRenderer(BaseComponent) {
  return (stateName, stateUpdaterName, initialState, middlewares = []) => {
    const Component = compose(
      withState(stateName, stateUpdaterName, initialState),
      withMiddleware(stateName, stateUpdaterName, middlewares)
    )(BaseComponent);

    return render(<Component />);
  };
}

afterEach(cleanup);

test('should throw an error when invalid argument', () => {
  expect(() => withMiddleware('counter', 'setState')).toThrowError();
});

describe('basic', () => {
  const renderer = createRenderer(Basic);

  test('should render without errors', () => {
    const { container } = renderer('counter', 'setCounter', 0, []);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should update state properly', () => {
    const { getByTestId } = renderer('counter', 'setCounter', 0, []);

    expect(getByTestId('value').textContent).toBe('0');

    fireEvent.click(getByTestId('increment'));
    expect(getByTestId('value').textContent).toBe('1');

    fireEvent.click(getByTestId('decrement'));
    expect(getByTestId('value').textContent).toBe('0');
  });
});

describe('using reducers', () => {
  const renderer = createRenderer(Dispatch);

  test('should render without errors', () => {
    const { container } = renderer('state', 'dispatch', reducer(), [
      useReducer(reducer)
    ]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should update state properly', () => {
    const { getByTestId } = renderer('state', 'dispatch', reducer(), [
      useReducer(reducer)
    ]);

    expect(getByTestId('value').textContent).toBe('0');

    fireEvent.click(getByTestId('increment'));
    expect(getByTestId('value').textContent).toBe('1');

    fireEvent.click(getByTestId('decrement'));
    expect(getByTestId('value').textContent).toBe('0');
  });
});
