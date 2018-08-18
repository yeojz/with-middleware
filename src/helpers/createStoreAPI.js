function dispatchError() {
  throw new Error(
    `Dispatching while constructing your middleware is not allowed. ` +
      `Other middleware would not be applied to this dispatch.`
  );
}

function createStoreAPI() {
  let dispatch = dispatchError;
  let state = null;

  const store = Object.freeze({
    dispatch: (...args) => dispatch(...args),
    getState: () => state
  });

  return {
    store,
    updateStoreDispatch: fn => {
      dispatch = fn;
    },
    updateState: value => {
      state = value;
    }
  };
}

export default createStoreAPI;
