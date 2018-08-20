import { cleanup, fireEvent } from 'react-testing-library';
import createRenderer from '../test-helpers/createRenderer';
import Dispatch from '../test-helpers/Dispatch';
import reducer from '../test-helpers/reducer';
import { BATCH_ACTION, SET_ACTION } from './constants';
import useReducer from './useReducer';

const noop = () => null;

describe('useReducer', () => {
  test('should throw error when invalid reducer given', () => {
    expect(() => useReducer()).toThrowError();
  });

  test('(SET_ACTION) should skip reducer step', () => {
    const next = jest.fn();

    const middleware = useReducer(noop);

    middleware()(next)({
      type: SET_ACTION,
      payload: 'test'
    });

    expect(next).toBeCalledWith('test');
  });

  test('(BATCH_ACTION) should reduce array of actions to a single state', () => {
    const next = jest.fn();
    const reducer = jest.fn();

    reducer.mockImplementation(() => 'test');

    const middleware = useReducer(reducer);

    middleware()(next)({
      type: BATCH_ACTION,
      payload: [{}, {}, {}],
      state: {}
    });

    expect(reducer).toHaveBeenCalledTimes(3);
    expect(next).toBeCalledWith('test');
  });

  test('should fall back to store.getState when no state provided', () => {
    const next = jest.fn();
    const reducer = jest.fn();
    const store = {
      getState: jest.fn().mockImplementation(() => 'test')
    };

    const middleware = useReducer(reducer);

    middleware(store)(next)({
      type: BATCH_ACTION,
      payload: [{}, {}, {}]
    });

    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(reducer).toHaveBeenNthCalledWith(1, 'test', {});
  });
});

describe('useReducer - mounted', () => {
  afterEach(cleanup);

  const renderer = createRenderer(Dispatch);

  function createWithReducer() {
    return renderer('state', 'dispatch', reducer(), [useReducer(reducer)]);
  }

  test('should render without errors', () => {
    const { container } = createWithReducer();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should update state properly', () => {
    const { getByTestId } = createWithReducer();

    expect(getByTestId('value').textContent).toBe('0');

    fireEvent.click(getByTestId('increment'));
    expect(getByTestId('value').textContent).toBe('1');

    fireEvent.click(getByTestId('decrement'));
    expect(getByTestId('value').textContent).toBe('0');
  });
});
