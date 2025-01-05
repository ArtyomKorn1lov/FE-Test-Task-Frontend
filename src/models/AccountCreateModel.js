import AccountCreateFileModel from "@/models/AccountCreateFileModel";

export default class AccountCreateModel {
  /** @type {String} */
  login;
  /** @type {String} */
  email;
  /** @type {AccountCreateFileModel} */
  picture;
  /** @type {String} */
  role;

  /**
   * @param {AccountCreateModel|null} data
   * @constructor
   */
  constructor(data = null) {
    this.login = data?.login;
    this.email = data?.email;
    this.picture = data?.picture;
    this.role = data?.role;
  }
}
