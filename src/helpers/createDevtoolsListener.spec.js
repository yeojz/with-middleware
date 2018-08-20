import createDevtoolsListener from './createDevtoolsListener';
import {
  SET_ACTION,
  BATCH_ACTION,
  DEVTOOLS_EXTENSION_SOURCE
} from '../constants';

describe('createDevtoolsListener', () => {
  const mockStore = {
    dispatch: jest.fn()
  };

  const mockNext = jest.fn();

  const mockInstance = {
    init: jest.fn()
  };

  beforeEach(() => {
    mockStore.dispatch.mockReset();
    mockNext.mockReset();
    mockInstance.init.mockReset();
  });

  test('should skip non devtool actions', () => {
    runAction({ type: 'SOMETHING', source: 'test' });
  });

  test('should skip everything if right source, but no message type', () => {
    runAction({
      type: 'DISPATCH',
      source: DEVTOOLS_EXTENSION_SOURCE,
      payload: {}
    });
  });

  test('should jump to action', () => {
    runAction(getJumpToAction());

    expect(mockNext).toBeCalledWith({
      type: SET_ACTION,
      payload: { count: 0 }
    });
  });

  test('should jump to state', () => {
    runAction(getJumpToState());

    expect(mockNext).toBeCalledWith({
      type: SET_ACTION,
      payload: { count: 1 }
    });
  });

  test('should be able to commit state', () => {
    mockNext.mockImplementation(() => ({ count: 2 }));

    runAction(getCommitAction());

    expect(mockInstance.init).toBeCalledWith({ count: 2 });
  });

  test('should allow for manual dispatching', () => {
    const action = getManualDispatch();
    runAction(action);

    expect(mockStore.dispatch).toBeCalledWith(JSON.parse(action.payload));
  });

  test('should not throw error when action is not a proper JSON', () => {
    const action = getManualDispatch();
    action.payload = 'nothing';
    expect(() => runAction(action)).not.toThrowError();
  });

  test('should be able to skip actions', () => {
    runAction(getToggleAction());
    expect(mockNext).toBeCalledWith({
      type: BATCH_ACTION,
      payload: [
        {
          type: '@@INIT'
        },
        {
          type: 'INCREMENT'
        },
        {
          type: 'INCREMENT'
        }
      ],
      state: {
        count: 0
      }
    });
  });

  test('should ignore skip if current state is before skip', () => {
    const action = getToggleAction();
    action.payload.id = 5;
    runAction(action);
    expect(mockNext).not.toBeCalled();
  });

  function runAction(action) {
    createDevtoolsListener(mockStore, mockNext, mockInstance)(action);
  }

  function getJumpToAction() {
    return {
      type: 'DISPATCH',
      payload: {
        type: 'JUMP_TO_ACTION',
        actionId: 2
      },
      state: '{"count":0}',
      id: '1',
      source: '@devtools-extension'
    };
  }

  function getJumpToState() {
    return {
      type: 'DISPATCH',
      payload: {
        type: 'JUMP_TO_STATE',
        actionId: 2
      },
      state: '{"count":1}',
      id: '1',
      source: '@devtools-extension'
    };
  }

  function getToggleAction() {
    return {
      type: 'DISPATCH',
      payload: {
        type: 'TOGGLE_ACTION',
        id: 2
      },
      state:
        '{"actionsById":{"0":{"action":{"type":"@@INIT"},"timestamp":1534778298610,"type":"PERFORM_ACTION"},"1":{"action":{"type":"INCREMENT"},"timestamp":1534778298603,"type":"PERFORM_ACTION"},"2":{"action":{"type":"DECREMENT"},"timestamp":1534778299298,"type":"PERFORM_ACTION"},"3":{"action":{"type":"INCREMENT"},"timestamp":1534778299840,"type":"PERFORM_ACTION"}},"computedStates":[{"state":{"count":0}},{"state":{"count":1}},{"state":{"count":0}},{"state":{"count":1}}],"currentStateIndex":3,"nextActionId":4,"skippedActionIds":[],"stagedActionIds":[0,1,2,3]}',
      id: '1',
      source: '@devtools-extension'
    };
  }

  function getCommitAction() {
    return {
      type: 'DISPATCH',
      payload: {
        type: 'COMMIT',
        timestamp: 1534861877301
      },
      id: '1',
      source: '@devtools-extension'
    };
  }

  function getManualDispatch() {
    return {
      type: 'ACTION',
      payload: '{"type": "INCREMENT"}',
      id: '1',
      source: '@devtools-extension'
    };
  }
});
