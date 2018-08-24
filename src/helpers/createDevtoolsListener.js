import {
  SET_ACTION,
  BATCH_ACTION,
  DEVTOOLS_EXTENSION_SOURCE
} from '../constants';

function getReplayPayload(skipId, state) {
  const currentStateIndex = `${state.currentStateIndex}`;

  return Object.keys(state.actionsById)
    .filter(actionId => actionId !== skipId && actionId <= currentStateIndex)
    .map(actionId => state.actionsById[actionId].action);
}

function filterNonDevtool(message) {
  return message.source !== DEVTOOLS_EXTENSION_SOURCE;
}

function filterNonDispatch(message) {
  return message.type !== 'DISPATCH' || !message.payload;
}

function applyManualDispatch(message, next, store) {
  if (message.type === 'ACTION') {
    try {
      const action = JSON.parse(message.payload);
      store.dispatch(action);
    } catch (err) {
      // do nothing
    }

    return true;
  }

  return false;
}

function applyCommit(instance) {
  return (message, next) => {
    if (message.payload.type === 'COMMIT') {
      instance.init(next({}));
      return true;
    }
    return false;
  };
}

function applyActionJumps(message, next) {
  if (
    message.payload.type === 'JUMP_TO_ACTION' ||
    message.payload.type === 'JUMP_TO_STATE'
  ) {
    next({
      type: SET_ACTION,
      payload: JSON.parse(message.state)
    });

    return true;
  }

  return false;
}

function applyActionSkips(message, next) {
  if (message.payload.type === 'TOGGLE_ACTION') {
    const state = JSON.parse(message.state);
    const skipId = `${message.payload.id}`;

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

  return false;
}

const createDevtoolsListener = (store, next, instance) => message => {
  [
    filterNonDevtool,
    applyManualDispatch,
    filterNonDispatch,
    applyActionJumps,
    applyActionSkips,
    applyCommit(instance)
  ].some(fn => fn(message, next, store));
};

export default createDevtoolsListener;
