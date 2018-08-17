let instanceId = 0;
const instances = {};

const ACTION_INIT = '@@RWM/INIT';

function getInstanceId(title) {
  if (title) {
    return title;
  }

  instanceId += 1;
  return instanceId;
}

function getInstance(instanceId) {
  if (instances[instanceId]) {
    return instances[instanceId];
  }

  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    instances[instanceId] = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
      name: instanceId
    });

    return instances[instanceId];
  }
}

function setState(next, value) {
  next({
    __devtools__: n => n(value)
  });
}

function getReplayValue(state, actionIds, fn) {
  const computedValue = actionIds.reduce((nextState, actionId) => {
    const action = state.actionsById[actionId].action;

    if (action.type === ACTION_INIT) {
      return nextState;
    }

    return fn(nextState, action);
  }, state.computedStates[0].state);

  return computedValue;
}

function replay(next, skipId, state) {
  if (skipId > state.currentStateIndex) {
    return;
  }

  const actionIds = Object.keys(state.actionsById).filter(x => {
    const current = parseInt(x, 10);
    return current !== skipId && current <= state.currentStateIndex;
  });

  next({
    __devtools__: (n, fn) => n(getReplayValue(state, actionIds, fn))
  });
}

const createListener = next => message => {
  if (message.type !== 'DISPATCH') {
    return;
  }

  if (
    message.payload.type === 'JUMP_TO_ACTION' ||
    message.payload.type === 'JUMP_TO_STATE'
  ) {
    setState(next, JSON.parse(message.state));
    return;
  }

  if (message.payload.type === 'TOGGLE_ACTION') {
    replay(next, message.payload.id, JSON.parse(message.state));
  }
};

function subscribe(store, next, instance, middleware) {
  if (!middleware.initialized) {
    instance.send(ACTION_INIT, store.getState());

    const listener = createListener(next);
    instance.subscribe(listener);
    middleware.initialized = true;
  }
}

function useDevtools(title) {
  const instanceId = getInstanceId(title);
  const instance = getInstance(instanceId);
  return store => next => action => {
    subscribe(store, next, instance, useDevtools);

    const state = next(action);
    if (instance) {
      instance.send(action, store.getState());
    }
    return state;
  };
}

export default useDevtools;
