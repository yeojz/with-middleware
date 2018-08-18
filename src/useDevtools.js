import { DEVTOOLS_INIT, SET_ACTION, BATCH_ACTION } from './constants';

let instanceId = 0;
const instances = {};

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
    type: SET_ACTION,
    payload: value
  });
}

function getReplayPayload(skipId, state) {
  const currentStateIndex = `${state.currentStateIndex}`;

  return Object.keys(state.actionsById)
    .filter(actionId => actionId !== skipId && actionId <= currentStateIndex)
    .map(actionId => state.actionsById[actionId].action);
}

function replay(next, skipId, state) {
  if (skipId > state.currentStateIndex) {
    return;
  }

  const payload = getReplayPayload(skipId, state);

  next({
    payload,
    state: state.computedStates[0].state,
    type: BATCH_ACTION
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
    replay(next, `${message.payload.id}`, JSON.parse(message.state));
  }
};

function subscribe(store, next, instance, middleware) {
  if (!middleware.initialized) {
    instance.send(DEVTOOLS_INIT, store.getState());

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
