import { FormFields } from "@/modules/forms/models";

export default class UseFormParams {
  /**
   * @public
   * @type {FormFields}
   */
  fields;
  /**
   * @public
   * @type {Function|VoidFunction|Promise<any>}
   */
  ajaxFunc;
  /**
   * @public
   * @type {Class}
   */
  sendModel;
  /**
   * @public
   * @type {Object}
   */
  validators;

  /**
   * @constructor
   * @param {UseFormParams} data
   */
  constructor(data) {
    this.fields = data?.fields
    this.ajaxFunc = data?.ajaxFunc;
    this.sendModel = data?.sendModel;
    this.validators = data?.validators;
  }
}
