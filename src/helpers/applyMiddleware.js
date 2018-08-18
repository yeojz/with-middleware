import compose from 'recompose/compose';
import createStoreAPI from './createStoreAPI';

function enhanceStore(api, middlewares, callback, originalDispatch) {
  const chain = middlewares.map(middleware => middleware(api.store));

  const finalNext = action => {
    const state =
      typeof action === 'function' ? action(api.store.getState()) : action;

    api.updateState(state);
    originalDispatch(state, callback);
    return state;
  };

  return compose(...chain)(finalNext);
}

function applyMiddleware(...middlewares) {
  const api = createStoreAPI();
  function createDispatch(originalState, originalDispatch) {
    api.updateState(originalState);

    return (action, callback) => {
      const dispatch = enhanceStore(
        api,
        middlewares,
        callback,
        originalDispatch
      );

      api.updateStoreDispatch(dispatch);
      return dispatch(action);
    };
  }

  return createDispatch;
}

export default applyMiddleware;
