import { BATCH_ACTION, SET_ACTION } from './constants';
import useReducer from './useReducer';

const noop = () => null;

test('should throw error when invalid reducer given', () => {
  expect(() => useReducer()).toThrowError();
});

describe('SET_ACTION', () => {
  test('should call next with correct value', () => {
    const next = jest.fn();

    const middleware = useReducer(noop);

    middleware()(next)({
      type: SET_ACTION,
      payload: 'test'
    });

    expect(next).toBeCalledWith('test');
  });
});

describe('BATCH_ACTION', () => {
  test('should execute list of actions', () => {
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
