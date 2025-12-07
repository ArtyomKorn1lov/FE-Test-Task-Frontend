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
  constructor(data) {
    super(data?.message);
    this.status = data?.status
  }
}
