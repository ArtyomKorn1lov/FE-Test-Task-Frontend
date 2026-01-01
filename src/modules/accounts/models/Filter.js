import { SortTypes } from '@/core';

export default class Filter {
  /**
   * @public
   * @type {String}
   * */
  sort;
  /**
   * @public
   * @type {String|SortTypes}
   * */
  order;
  /**
   * @public
   * @type {String}
   * */
  search;
  /**
   * @public
   * @type {String}
   * */
  roleCode;

  /**
   * @constructor
   * @param {Filter|null} data
   * */
  constructor(
    data = {
      sort: '',
      order: '',
    },
  ) {
    this.sort = data?.sort;
    this.order = data?.order;
    this.search = data?.search;
    this.roleCode = data?.roleCode;
  }
}
