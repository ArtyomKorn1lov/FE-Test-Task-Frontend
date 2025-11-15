export default class Modal {
  /**
   * @public
   * @type {boolean}
   * */
  toggle;
  /**
   * @public
   * @type {string|boolean}
   * */
  code;
  /**
   * @public
   * @type {string|boolean}
   * */
  title;
  /**
   * @public
   * @type {string|boolean}
   * */
  accountEditId;

  /**
   * @constructor
   * @param {Modal|null} data
   */
  constructor(data = null) {
    this.toggle = data?.toggle;
    this.code = data?.code;
    this.title = data?.title;
    this.accountEditId = data?.accountEditId;
  }
}
