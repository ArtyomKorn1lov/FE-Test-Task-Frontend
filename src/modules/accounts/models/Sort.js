export default class Sort {
  /**
   * @public
   * @type {String}
   * */
  sort;
  /**
   * @public
   * @type {String}
   * */
  order;

  /**
   * @constructor
   * @param {Sort} data
   */
  constructor(data = null) {
    this.sort = data?.sort;
    this.order = data?.order;
  }
}
