export default class CloseModal {
  /**
   * @public
   * @type {Boolean}
   * */
  toggle;

  /**
   * @constructor
   * @param {CloseModal|null} data
   */
  constructor(data = null) {
    this.toggle = data?.toggle;
  }
}
