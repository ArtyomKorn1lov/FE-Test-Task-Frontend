export default class CloseModalParams {
  /**
   * @public
   * @type {Boolean}
   * */
  toggle;

  /**
   * @constructor
   * @param {CloseModalParams|null} data
   */
  constructor(data = null) {
    this.toggle = data?.toggle;
  }
}
