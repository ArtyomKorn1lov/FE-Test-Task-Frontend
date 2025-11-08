export default class SelectRoleModel {
  /**
   * @type {String}
   */
  roleCode;
  /**
   * @type {String}
   */
  roleName;

  /**
   * @param {SelectRoleModel} data
   */
  constructor(data = null) {
    this.roleCode = data?.roleCode;
    this.roleName = data?.roleName;
  }
}
