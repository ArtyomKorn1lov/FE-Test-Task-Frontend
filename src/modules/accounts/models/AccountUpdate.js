import { File } from '@/core';

export default class AccountUpdate {
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
   * @param {AccountUpdate|null} data
   */
  constructor(data = null) {
    this.id = data?.id;
    this.login = data?.login;
    this.email = data?.email;
    this.picture = data?.picture;
    this.role = data?.role;
  }
}
