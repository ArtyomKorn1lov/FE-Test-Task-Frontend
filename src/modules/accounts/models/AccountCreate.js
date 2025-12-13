import { File } from '@/core';

export default class AccountCreate {
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
   * @type {File}
   * */
  picture;
  /**
   * @public
   * @type {String}
   * */
  role;

  /**
   * @constructor
   * @param {AccountCreate|null} data
   */
  constructor(data = null) {
    this.login = data?.login;
    this.email = data?.email;
    this.picture = data?.picture;
    this.role = data?.role;
  }
}
