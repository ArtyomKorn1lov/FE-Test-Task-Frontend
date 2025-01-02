export default class ContextSearchModel {
  /**
   * @type {String}
   */
  search;
  /** @type {String} */
  roleCode;

  /**
   * @param {ContextSearchModel|null} data
   */
  constructor(data = null) {
    this.search = data?.search;
    this.roleCode = data?.roleCode;
  }
}
