export default class AccountDelete {
  /**
   * @public
   * @type {Number[]}
   * */
  ids;

  /**
   * @constructor
   * @param {AccountDelete|null} data
   */
  constructor(data = null) {
    this.ids = data?.ids;
  }
}
