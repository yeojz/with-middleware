import createDevtoolsListener from './helpers/createDevtoolsListener';

let instanceId = 0;
const instances = {};
const initialized = {};

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

function subscribe(store, next, instance, instanceId) {
  if (instance && !initialized[instanceId]) {
    instance.init(store.getState());

    const listener = createDevtoolsListener(store, next, instance);

    instance.subscribe(listener);
    initialized[instanceId] = true;
  }
}

function useDevtools(title) {
  const instanceId = getInstanceId(title);
  const instance = getInstance(instanceId);

  return store => next => action => {
    subscribe(store, next, instance, instanceId);

    const state = next(action);
    if (instance) {
      instance.send(action, store.getState());
    }
    return state;
  };
}

export default useDevtools;
