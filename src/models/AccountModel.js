export default class AccountModel {
  /** @type {Number} */
  id;
  /** @type {String} */
  login;
  /** @type {String} */
  email;
  /** @type {String} */
  picture;
  /** @type {String} */
  role;
  /** @type {String} */
  roleCode;

  /**
   * @param {AccountModel|null} data
   * @constructor
   */
  constructor(data = null) {
    this.id = data?.id;
    this.login = data?.login;
    this.email = data?.email;
    this.picture = data?.picture;
    this.role = data?.role;
    this.roleCode = data?.roleCode;
  }
}
