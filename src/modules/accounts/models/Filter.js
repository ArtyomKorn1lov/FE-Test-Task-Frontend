import { SortTypes } from '@/core';

export default class Filter {
  /**
   * @public
   * @type {String|SortTypes}
   * */
  sort;
  /**
   * @public
   * @type {String}
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
