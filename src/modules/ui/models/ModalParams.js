import {ModalComponentsCodes} from "@/modules/accounts/enums";

export default class ModalParams {
  /**
   * @public
   * @type {Boolean}
   * */
  toggle;
  /**
   * @public
   * @type {ModalComponentsCodes|String|Boolean}
   * */
  code;
  /**
   * @public
   *  @type {String|Boolean}
   *  */
  title;
  /**
   * @public
   * @type {String|Boolean}
   * */
  accountEditId;

  /**
   * @constructor
   * @param {ModalParams|null} data
   */
  constructor(data = null) {
    this.toggle = data?.toggle;
    this.code = data?.code;
    this.title = data?.title;
    this.accountEditId = data?.accountEditId;
  }
}
