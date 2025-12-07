export default class SelectRole {
  /**
   * @public
   * @type {String}
   */
  roleCode;
  /**
   * @public
   * @type {String}
   */
  roleName;

  /**
   * @constructor
   * @param {SelectRole} data
   */
  constructor(data = null) {
    this.roleCode = data?.roleCode;
    this.roleName = data?.roleName;
  }
}
