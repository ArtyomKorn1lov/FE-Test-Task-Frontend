export default class ResetModalComponentModel {
  /** @type {String} */
  modalCode;

  /**
   * @param {ResetModalComponentModel} data
   */
  constructor(data = null) {
    this.modalCode = data?.modalCode;
  }
}
