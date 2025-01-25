import FilterModel from "@/models/FilterModel";
import PaginationModel from "@/models/PaginationModel";

export default class StoreModel {
  /** @type {Boolean} */
  modalToggle;
  /** @type {String|Boolean} */
  modalCode;
  /** @type {String|Boolean} */
  modalTitle;
  /** @type {String} */
  accountEditId;
  /** @type {FilterModel} */
  filter;
  /** @type {PaginationModel} */
  pagination;


  /** @param {StoreModel|null} data */
  constructor(data = null) {
    this.modalToggle = !!data?.modalToggle ? data?.modalToggle : false;
    this.modalCode = !!data?.modalCode ? data?.modalCode : false;
    this.modalTitle = !!data?.modalTitle ? data?.modalTitle : false;
    this.accountEditId = !!data?.accountEditId ? data?.accountEditId : false;
    this.filter = !!data?.filter ? data?.filter : new FilterModel();
    this.pagination = !!data?.pagination ? data?.pagination : new PaginationModel();
  }
}
