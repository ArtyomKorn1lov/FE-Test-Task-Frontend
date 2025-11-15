import Filter from "@/modules/accounts/models/Filter";
import Pagination from "@/modules/accounts/models/Pagination";

export default class FilterStore {
  /**
   * @public
   * @type {Boolean}
   * */
  modalToggle;
  /**
   * @public
   * @type {String|Boolean}
   * */
  modalCode;
  /**
   * @public
   * @type {String|Boolean}
   * */
  modalTitle;
  /**
   * @public
   * @type {String}
   * */
  accountEditId;
  /**
   * @public
   * @type {Filter}
   * */
  filter;
  /**
   * @public
   * @type {Pagination}
   * */
  pagination;


  /**
   * @constructor
   * @param {FilterStore|null} data
   * */
  constructor(data = null) {
    this.modalToggle = data?.modalToggle;
    this.modalCode = data?.modalCode;
    this.modalTitle = data?.modalTitle;
    this.accountEditId = data?.accountEditId;
    this.filter = data?.filter;
    this.pagination = data?.pagination;
  }
}
