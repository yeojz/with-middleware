import React from 'react';
import { compose, withState } from 'recompose';
import { withMiddleware, useDevtools, useReducer } from 'with-middleware';

const initialStore = {
  getState: () => ({}),
  dispatch: () => null
};

const {
  Provider: StoreProvider,
  Consumer: StoreConsumer
} = React.createContext(initialStore);

function getTitle() {
  if (typeof window !== 'undefined') {
    return window.document.title;
  }

  return 'redux-emulator';
}

export function createStore(reducer, preloadedState, middlewares) {
  if (Array.isArray(preloadedState) && typeof middlewares === 'undefined') {
    middlewares = preloadedState;
    preloadedState = reducer();
  }

  const mw = [...middlewares];

  if (process.env.NODE_ENV !== 'production') {
    mw.push(useDevtools(getTitle()));
  }

  mw.push(useReducer(reducer));

  return compose(
    withState('state', 'dispatch', preloadedState),
    withMiddleware('state', 'dispatch', mw)
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

export function applyMiddleware(...middlewares) {
  return middlewares;
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
