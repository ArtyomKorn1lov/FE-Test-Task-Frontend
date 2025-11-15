export default class AccountFormValidators {
  /**
   * @public
   * @type {RegExp}
   */
  email;

  /**
   * @constructor
   * @param {AccountFormValidators|null} data
   */
  constructor(data = null) {
    this.email = data?.email;
  }
}
