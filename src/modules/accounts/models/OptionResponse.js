export default class OptionResponse {
  /**
   * @public
   * @type {String}
   */
  code;
  /**
   * @public
   * @type {String}
   */
  value;

  /**
   * @constructor
   * @param {OptionResponse} data
   */
  constructor(data) {
    this.code = data?.code;
    this.value = data?.value;
  }
}
