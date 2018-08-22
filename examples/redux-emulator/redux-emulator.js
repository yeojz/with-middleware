import React from 'react';
import { compose, withState } from 'recompose';
import { withMiddleware, useReducer } from 'with-middleware';

const initialStore = {
  getState: () => ({}),
  dispatch: () => null
};

const {
  Provider: StoreProvider,
  Consumer: StoreConsumer
} = React.createContext(initialStore);

export function createStore(reducer, preloadedState, middlewares) {
  if (Array.isArray(preloadedState) && typeof middlewares === 'undefined') {
    middlewares = preloadedState;
    preloadedState = reducer();
  }

  return compose(
    withState('state', 'dispatch', preloadedState),
    withMiddleware('state', 'dispatch', [...middlewares, useReducer(reducer)])
  )(props => (
    <StoreProvider
      value={{
        getState: () => props.state,
        dispatch: props.dispatch
      }}
    >
      {props.children}
    </StoreProvider>
  ));
}

export function Provider(props) {
  const Component = props.store; // eslint-disable-line
  return <Component>{props.children}</Component>; // eslint-disable-line
}

export function bindActionCreator(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return actionCreators(dispatch);
  }

  return Object.keys(actionCreators).reduce((props, key) => {
    const action = actionCreators[key];
    props[key] = (...args) => dispatch(action(...args));
    return props;
  }, {});
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return Component => {
    function ConnectedComponent(props) {
      return (
        <StoreConsumer>
          {store => {
            const stateProps = mapStateToProps(store.getState());
            const dispatchProps = bindActionCreator
              ? bindActionCreator(mapDispatchToProps, store.dispatch)
              : { dispatch: store.dispatch };
            return <Component {...stateProps} {...dispatchProps} {...props} />;
          }}
        </StoreConsumer>
      );
    }
    return ConnectedComponent;
  };
}
