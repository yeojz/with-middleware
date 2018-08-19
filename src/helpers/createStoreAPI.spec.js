import createStoreAPI from './createStoreAPI';

test('should throw dispatch error when no dispatch provided', () => {
  const api = createStoreAPI();

  expect(() => api.store.dispatch()).toThrowError();
});
