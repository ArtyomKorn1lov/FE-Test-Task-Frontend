import FilterModel from "@/models/FilterModel";

export default class StoreModel {
  /** @type {Boolean} */
  modalToggle;
  /** @type {String|Boolean} */
  modalCode;
  /** @type {String|Boolean} */
  modalTitle;
  /** @type {FilterModel} */
  filter;

  /** @param {StoreModel|null} data */
  constructor(data = null) {
    this.modalToggle = !!data?.modalToggle ? data?.modalToggle : false;
    this.modalCode = !!data?.modalCode ? data?.modalCode : false;
    this.modalTitle = !!data?.modalTitle ? data?.modalTitle : false;
    this.filter = !!data?.filter ? data?.filter : new FilterModel();
  }
}

StoreModel.MODAL_TOGGLE = 'modalToggle';
StoreModel.MODAL_CODE = 'modalCode';
StoreModel.MODAL_TITLE = 'modalTitle';
