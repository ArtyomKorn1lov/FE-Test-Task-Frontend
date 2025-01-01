export default class SelectRoleModel {
  /**
   * @type {String}
   */
  roleCode;

  /**
   * @param {SelectRoleModel} data
   */
  constructor(data = null) {
    this.roleCode = data?.roleCode;
  }
}
