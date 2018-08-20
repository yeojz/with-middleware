import { cleanup, fireEvent } from 'react-testing-library';
import createRenderer from '../test-helpers/createRenderer';
import Dispatch from '../test-helpers/Dispatch';
import reducer from '../test-helpers/reducer';
import useReducer from './useReducer';
import useDevtools from './useDevtools';

jest.mock('./helpers/createDevtoolsListener', () => jest.fn());

describe('useDevtools - mounted', () => {
  const connect = {
    send: jest.fn(),
    init: jest.fn(),
    subscribe: jest.fn()
  };

  beforeEach(() => {
    connect.init.mockReset();
    connect.send.mockReset();
    connect.subscribe.mockReset();
    global.__REDUX_DEVTOOLS_EXTENSION__ = {
      connect: () => connect
    };
  });

  afterEach(cleanup);

  const renderer = createRenderer(Dispatch);

  function createWithDevtool(title) {
    return renderer('state', 'dispatch', reducer(), [
      useDevtools(title),
      useReducer(reducer)
    ]);
  }

  test('should render without errors (with title)', () => {
    const { container } = createWithDevtool('test');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render without errors (without title)', () => {
    const { container } = createWithDevtool();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should send correct information to redux dev tool', () => {
    const { getByTestId } = createWithDevtool('test');
    fireEvent.click(getByTestId('increment'));
  });
});
