const noop = () => {};
class MyPromise {
  constructor(executer) {
    this.queue = [];
    this.errorHander = noop;
    this.finallyHander = noop;
    try {
      executer(this._onResolve.bind(this), this._onReject.bind(this));
    } catch (e){
      this.errorHander(e)
    } finally {
      this.finallyHander();
    }
  }

  _onResolve(data) {
    this.queue.forEach(callback => {
      data = callback(data);
    })
    this.finallyHander();
  }

  _onReject(error) {
    this.errorHander(error);
    this.finallyHander();
  }

  then(fn) {
    this.queue.push(fn)
    
    return this;
  }

  catch(fn) {
    this.errorHander = fn;

    return this;
  }

  finally(fn) {
    this.finallyHander = fn;

    return this;
  }
}

module.exports = MyPromise;