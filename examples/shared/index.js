/* eslint-disable no-console */

// logger from:
// https://github.com/reduxjs/redux/blob/bebd067fed678de1926a76284ebaf4373c6b2769/docs/advanced/Middleware.md#seven-examples
export const logger = store => next => action => {
  console.group('logging middleware');
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export const initialState = { count: 0 };

export const reducer = (state = initialState, action = {}) => {
  if (action.type === 'INCREMENT') {
    return { count: state.count + 1 };
  }
  if (action.type === 'DECREMENT') {
    return { count: state.count - 1 };
  }
  return state;
};
