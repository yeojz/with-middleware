import { compose } from 'recompose';

function dispatchError() {
  throw new Error(
    `Dispatching while constructing your middleware is not allowed. ` +
      `Other middleware would not be applied to this dispatch.`
  );
}

function createStoreAPI(stateProp, dispatchProp) {
  let dispatch = dispatchError;
  let state = stateProp;

  const store = Object.freeze({
    dispatch: (...args) => dispatch(...args),
    getState: () => state
  });

  return {
    dispatchProp,
    store,
    updateDispatchFn: fn => {
      dispatch = fn;
    },
    updateState: value => {
      state = value;
    }
  };
}

function enhanceStore(api, middlewares, callback) {
  const chain = middlewares.map(middleware => middleware(api.store));

  const finalNext = action => {
    const state =
      typeof action === 'function' ? action(api.store.getState()) : action;

    api.updateState(state);
    api.dispatchProp(state, callback);
    return state;
  };

  return compose(...chain)(finalNext);
}

function applyMiddleware(...middlewares) {
  function createDispatch(stateProp, dispatchProp) {
    const api = createStoreAPI(stateProp, dispatchProp);

    return (action, callback) => {
      const dispatch = enhanceStore(api, middlewares, callback);

      api.updateDispatchFn(dispatch);
      return dispatch(action);
    };
  }

  return createDispatch;
}

export default applyMiddleware;
