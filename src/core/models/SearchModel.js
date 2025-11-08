export default class SearchModel {
  /**
   * @type {String}
   */
  search;

  /**
   * @param {SearchModel|null} data
   */
  constructor(data = null) {
    this.search = data?.search;
  }
}
