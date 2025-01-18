export default class AccountDeleteModel {
  /** @type {Array<number>} */
  ids;

  /**
   * @param {AccountDeleteModel|null} data
   */
  constructor(data = null) {
    this.ids = data?.ids;
  }
}
