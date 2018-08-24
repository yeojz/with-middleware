import createStoreAPI from './createStoreAPI';
import compose from './compose';

function createFinalNext(api, originalDispatch, callback) {
  return action => {
    const state =
      typeof action === 'function' ? action(api.store.getState()) : action;

    api.updateState(state);
    originalDispatch(state, callback);

    return state;
  };
}

function applyMiddleware(...middlewares) {
  const api = createStoreAPI();
  const chain = middlewares.map(middleware => middleware(api.store));
  const enhancer = compose(...chain);

  function createDispatch(originalState, originalDispatch) {
    api.updateState(originalState);

    return (action, callback) => {
      const next = createFinalNext(api, originalDispatch, callback);
      const dispatch = enhancer(next);

      api.updateStoreDispatch(dispatch);

      return dispatch(action);
    };
  }

  return createDispatch;
}

export default applyMiddleware;
