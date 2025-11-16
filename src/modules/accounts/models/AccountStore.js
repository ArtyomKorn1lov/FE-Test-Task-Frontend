import Filter from "@/modules/accounts/models/Filter";
import Pagination from "@/modules/accounts/models/Pagination";
import Account from "@/modules/accounts/models/Account";

export default class AccountStore {
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
   * @type {Number|Boolean}
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
   * @public
   * @type {Account[]}
   */
  items;
  /**
   * @public
   * @type {Boolean}
   * */
  isLoading;


  /**
   * @constructor
   * @param {AccountStore|null} data
   * */
  constructor(data = null) {
    this.modalToggle = data?.modalToggle;
    this.modalCode = data?.modalCode;
    this.modalTitle = data?.modalTitle;
    this.accountEditId = data?.accountEditId;
    this.filter = data?.filter;
    this.pagination = data?.pagination;
    this.items = data?.items;
    this.isLoading = data?.isLoading;
  }
}
