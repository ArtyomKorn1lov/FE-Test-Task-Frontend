export default class AccountDeleteModel {
  /** @type {Array<Number>} */
  ids;

  /**
   * @param {AccountDeleteModel|null} data
   */
  constructor(data = null) {
    this.ids = data?.ids;
  }
}
