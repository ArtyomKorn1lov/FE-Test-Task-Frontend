export default class PaginationModel {
  /** @type {Number} */
  page;
  /** @type {Number} */
  pageCount;

  constructor(data = {
    page: 0,
    pageCount: 0,
  }) {
    this.page = data?.page;
    this.pageCount = data?.pageCount;
  }
}
