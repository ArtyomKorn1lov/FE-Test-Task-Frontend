import TestObject from './TestObject';

export default class TestModel {
  /**
   * @public
   * @type {Number}
   */
  count;
  /**
   * @public
   * @type {TestObject}
   */
  object;

  /**
   * @constructor
   * @param {TestModel} data
   */
  constructor(data = null) {
    this.count = data?.count;
    this.object = data?.object;
  }
}
