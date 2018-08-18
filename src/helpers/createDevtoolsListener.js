import { SET_ACTION, BATCH_ACTION } from '../constants';

const DEVTOOLS_EXTENSION_SOURCE = '@devtools-extension';

function getReplayPayload(skipId, state) {
  const currentStateIndex = `${state.currentStateIndex}`;

  return Object.keys(state.actionsById)
    .filter(actionId => actionId !== skipId && actionId <= currentStateIndex)
    .map(actionId => state.actionsById[actionId].action);
}

function applyManualDispatch(message, next, store) {
  if (
    message.type === 'ACTION' &&
    message.source === DEVTOOLS_EXTENSION_SOURCE
  ) {
    try {
      const action = JSON.parse(message.payload);
      store.dispatch(action);
    } catch (err) {
      console.error(err); // eslint-disable-line
    }

    return true;
  }

  return false;
}

function filterNonDevtool(message) {
  return (
    message.type !== 'DISPATCH' || message.source !== DEVTOOLS_EXTENSION_SOURCE
  );
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
    applyManualDispatch,
    filterNonDevtool,
    applyActionJumps,
    applyActionSkips,
    applyCommit(instance)
  ].some(fn => fn(message, next, store));
};

export default createDevtoolsListener;
