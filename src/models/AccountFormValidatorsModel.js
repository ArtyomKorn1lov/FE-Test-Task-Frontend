export default class AccountFormValidatorsModel {
  /**
   * @type {RegExp}
   */
  email;

  /**
   * @param {AccountFormValidatorsModel|null} data
   */
  constructor(data = null) {
    this.email = data?.email;
  }
}
