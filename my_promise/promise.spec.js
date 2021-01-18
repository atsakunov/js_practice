let MyPromise = require('./promise');

const successResult = 42;
const errorResult = 'I am promise';
describe('My Promise', () => {
  let executerSpy;
  let promise;

  beforeEach(() => {
    executerSpy = jest.fn(resolve => setTimeout(() => resolve(successResult), 150));
    promise = new MyPromise(executerSpy);
  })
  test('MyPromise should exist and to be typeof function', () => {
    expect(MyPromise).toBeDefined();
    expect(typeof MyPromise).toBe('function');
  });

  test('MyPromise should have methods: then, catch, finally', () => {
    expect(promise.then).toBeDefined();
    expect(promise.catch).toBeDefined();
    expect(promise.finally).toBeDefined();
  });

  test('MyPromise should call executer function', () => {
    expect(executerSpy).toHaveBeenCalled();
  });
  
  test('MyPromise should get data in then block and chain them', async () => {
    const result = await promise.then(e => e).then(e => e * 2);

    expect(result).toBe(successResult * 2);
  });
  
  test('MyPromise should catch error', async () => {
    const errorExecuter = (_, reject) => setTimeout(() => reject(errorResult), 150);
    const errorPromise = new MyPromise(errorExecuter);

    return new Promise(resolve => {
      errorPromise.catch(error => {
        expect(error).toBe(errorResult);
        resolve();
      })
    })
  });
  
  test('MyPromise should call finnaly', async () => {
    const finallySpy = jest.fn(e => e);
    await promise.finally(finallySpy);
    expect(finallySpy).toHaveBeenCalled();
  });
});
