import React from 'react';
import withMiddleware from './withMiddleware';
import { compose, withState } from 'recompose';
import TestRenderer from 'react-test-renderer';
import Basic from '../tests/helpers/Basic';

describe('withMiddleware', () => {
  describe('Basic', () => {
    let called;
    const middleware = () => next => action => {
      const result = next(action);
      called(result);
      return result;
    };

    beforeEach(() => {
      called = jest.fn();
    });

    const enhancer = compose(
      withState('counter', 'setCounter', 0),
      withMiddleware('counter', 'setCounter', [middleware])
    );

    test('should render without errors', () => {
      const Component = enhancer(Basic);
      const result = TestRenderer.create(<Component />);
      expect(result).toMatchSnapshot();
    });

    test('should throw an error when invalid argument', () => {
      expect(() => withMiddleware('counter', 'setState')).toThrowError();
    });
  });
});
