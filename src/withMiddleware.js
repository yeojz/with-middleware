import { createFactory } from 'react';
import applyMiddleware from './helpers/applyMiddleware';

function withMiddleware(stateName, dispatchName, middlewares) {
  if (!Array.isArray(middlewares)) {
    throw new Error(
      `Expecting argument 3 of "withMiddleware" to be an array. ${typeof middlewares} given.`
    );
  }

  const createDispatch = applyMiddleware(...middlewares);

  return BaseComponent => {
    const factory = createFactory(BaseComponent);

    function WithMiddleware(props) {
      const dispatch = createDispatch(props[stateName], props[dispatchName]);

      return factory(
        Object.assign({}, props, {
          [dispatchName]: dispatch
        })
      );
    }

    return WithMiddleware;
  };
}

export default withMiddleware;
