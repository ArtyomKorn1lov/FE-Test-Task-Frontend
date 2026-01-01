export default class Pagination {
  /**
   * @public
   * @type {Number}
   * */
  page;
  /**
   * @public
   * @type {Number}
   * */
  pageCount;

  /**
   * @constructor
   * @param {Pagination} data
   */
  constructor(
    data = {
      page: 0,
      pageCount: 0,
    },
  ) {
    this.page = data?.page;
    this.pageCount = data?.pageCount;
  }
}
