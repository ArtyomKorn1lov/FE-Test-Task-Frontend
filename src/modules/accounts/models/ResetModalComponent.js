export default class ResetModalComponent {
  /**
   * @public
   * @type {String}
   * */
  modalCode;

  /**
   * @constructor
   * @param {ResetModalComponent} data
   */
  constructor(data = null) {
    this.modalCode = data?.modalCode;
  }
}
