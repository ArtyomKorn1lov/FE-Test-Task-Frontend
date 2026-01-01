export default class ResponseException extends Error {
  /**
   * @public
   * @type {Number}
   */
  status;

  /**
   * @constructor
   * @param {ResponseException} data
   */
  constructor(data = null) {
    super(data?.message);
    this.status = data?.status;
  }
}
