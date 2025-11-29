export default class ContextSearchResponse {
  /**
   * @public
   * @type {string}
   */
  login;

  /**
   * @constructor
   * @param {ContextSearchResponse|null} data
   */
  constructor(data = null) {
    this.login = data?.login;
  }
}
