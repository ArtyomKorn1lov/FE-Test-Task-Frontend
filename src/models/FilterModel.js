export default class FilterModel {
  /** @type {Number} */
  page;
  /** @type {Number} */
  pageCount;
  /** @type {String} */
  sort;
  /** @type {String} */
  order;
  /** @type {String} */
  search;

  /** @param {FilterModel|null} data */
  constructor(data = {
    page: 0,
    pageCount: 0,
    sort: '',
    order: ''
  }) {
    this.page = data?.page;
    this.pageCount = data?.pageCount;
    this.sort = data?.sort;
    this.order = data?.order;
    this.search = data?.search;
  }
}
