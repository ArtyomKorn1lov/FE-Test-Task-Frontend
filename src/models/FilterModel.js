export default class FilterModel {
  /** @type {String} */
  sort;
  /** @type {String} */
  order;
  /** @type {String} */
  search;
  /** @type {String} */
  roleCode;

  /** @param {FilterModel|null} data */
  constructor(data = {
    sort: '',
    order: ''
  }) {
    this.sort = data?.sort;
    this.order = data?.order;
    this.search = data?.search;
    this.roleCode = data?.roleCode;
  }
}
