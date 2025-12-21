export default class NextDependenceTestService {
  /**
   * @private
   * @type {Number}
   */
  counter;

  /**
   * @constructor
   * @param {Number} counter
   */
  constructor(counter) {
    this.counter = counter;
  }

  /**
   * @public
   * @return {Number}
   */
  getCounter() {
    return this.counter;
  }
}
