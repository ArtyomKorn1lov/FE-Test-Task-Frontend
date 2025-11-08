import AccountUpdateFileModel from "@/core/models/AccountUpdateFileModel.js";

export default class AccountEditModel {
  /** @type {Number} */
  id;
  /** @type {String} */
  login;
  /** @type {String} */
  email;
  /** @type {AccountUpdateFileModel|null} */
  picture;
  /** @type {String} */
  role;

  /**
   * @param {AccountEditModel|null} data
   * @constructor
   */
  constructor(data = null) {
    this.id = data?.id;
    this.login = data?.login;
    this.email = data?.email;
    this.picture = data?.picture;
    this.role = data?.role;
  }
}
