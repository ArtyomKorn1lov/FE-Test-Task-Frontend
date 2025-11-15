export default class CommonResponse {
  /**
   * @public
   * @type {String}
   */
  message;

  /**
   * @constructor
   * @param {CommonResponse} data
   */
  constructor(data) {
    this.message = data?.message;
  }
}
