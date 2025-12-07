export default class Search {
  /**
   * @public
   * @type {String}
   */
  search;

  /**
   * @constructor
   * @param {Search|null} data
   */
  constructor(data = null) {
    this.search = data?.search;
  }
}
