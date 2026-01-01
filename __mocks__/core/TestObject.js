export default class TestObject {
  /**
   * @public
   * @type {String|Number}
   */
  value;
  /**
   * @public
   * @type {String}
   */
  label;

  /**
   * @constructor
   * @param {TestObject} data
   */
  constructor(data = null) {
    this.value = data?.value;
    this.label = data?.label;
  }
}
