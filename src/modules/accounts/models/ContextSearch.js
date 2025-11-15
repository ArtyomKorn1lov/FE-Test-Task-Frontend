export default class ContextSearch {
  /**
   * @public
   * @type {String}
   */
  search;
  /**
   * @public
   * @type {String}
   */
  roleCode;

  /**
   * @constructor
   * @param {ContextSearch|null} data
   */
  constructor(data = null) {
    this.search = data?.search;
    this.roleCode = data?.roleCode;
  }
}
