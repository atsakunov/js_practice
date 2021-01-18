let MyPromise;
describe('My Promise', () => {
  test('Promise should exist and to be typeof function', () => {
    expect(MyPromise).toBeDefined();
    expect(typeof MyPromise).toBe('function');
  });
});
