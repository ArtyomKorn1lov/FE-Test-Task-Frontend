export default class FilterRole {
  /**
   * @public
   * @type {String}
   * */
  roleCode;

  /**
   * @constructor
   * @param {FilterRole} data
   */
  constructor(data = null) {
    this.roleCode = data?.roleCode;
  }
}
