export default class StoreModel {
  /** @type {boolean} */
  modalToggle;
  /** @type {string|boolean} */
  modalCode;
  /** @type {string|boolean} */
  modalTitle;

  /** @param {StoreModel|null} data */
  constructor(data = null) {
    this.modalToggle = !!data?.modalToggle ? data?.modalToggle : false;
    this.modalCode = !!data?.modalCode ? data?.modalCode : false;
    this.modalTitle = !!data?.modalTitle ? data?.modalTitle : false;
  }
}

StoreModel.MODAL_TOGGLE = 'modalToggle';
StoreModel.MODAL_CODE = 'modalCode';
StoreModel.MODAL_TITLE = 'modalTitle';
