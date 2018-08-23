# Using withState

The [basic usage](../basic-usage/README.md) can be simplified with the help of `withState` from `recompose`

```diff
import React from 'react';
+ import { compose, withState } from 'recompose';
import { withMiddleware } from 'with-middleware';
import { logger } from '../shared';

- const enhance = withMiddleware('counter', 'setCounter', [logger]);
+ const enhance = compose(
+   withState('counter', 'setCounter', 0),
+   withMiddleware('counter', 'setCounter', [logger])
+ );

- const CounterDisplay = enhance(({ counter, setCounter }) => (
+ const Counter = enhance(({ counter, setCounter }) => (
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
));

-class Counter extends React.Component {
-  state = {
-    counter: 0
-  };
-
-  setCounter = value => {
-    this.setState({ counter: value });
-  };
-
-  render() {
-    return (
-      <CounterDisplay counter={this.state.counter} setCounter={this.setCounter} />
-    );
-  }
-}

export default Counter;
```

To run example, please refer to [examples/README.md](../README.md)
