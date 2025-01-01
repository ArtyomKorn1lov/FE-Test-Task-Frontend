export default class ContextSearchModel {
  /**
   * @type {String}
   */
  search;

  /**
   * @param {ContextSearchModel|null} data
   */
  constructor(data = null) {
    this.search = data?.search;
  }
}
