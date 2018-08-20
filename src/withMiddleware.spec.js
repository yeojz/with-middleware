import { cleanup, fireEvent } from 'react-testing-library';
import Basic from '../test-helpers/Basic';
import withMiddleware from './withMiddleware';

import createRenderer from '../test-helpers/createRenderer';

describe('withMiddleware', () => {
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
});
