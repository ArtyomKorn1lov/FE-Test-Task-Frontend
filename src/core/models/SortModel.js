export default class SortModel {
  /** @type {String} */
  sort;
  /** @type {String} */
  order;

  /**
   * @param {SortModel} data
   */
  constructor(data = null) {
    this.sort = data?.sort;
    this.order = data?.order;
  }
}
