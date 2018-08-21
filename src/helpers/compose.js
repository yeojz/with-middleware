function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg);
}

export default compose;
