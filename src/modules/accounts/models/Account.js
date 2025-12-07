export default class Account {
  /**
   * @public
   * @type {Number}
   * */
  id;
  /**
   * @public
   * @type {String}
   * */
  login;
  /**
   * @public
   * @type {String}
   * */
  email;
  /**
   * @public
   * @type {String}
   * */
  picture;
  /**
   * @public
   * @type {String}
   * */
  role;
  /**
   * @public
   * @type {String}
   * */
  roleCode;

  /**
   * @constructor
   * @param {Account|null} data
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
