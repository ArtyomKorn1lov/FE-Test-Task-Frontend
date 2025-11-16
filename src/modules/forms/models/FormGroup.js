import FormField from "@/modules/forms/models/FormField.js";

export default class FormGroup {
  /**
   * @public
   * @type {String}
   */
  code;
  /**
   * @public
   * @type {String}
   */
  title;
  /**
   * @public
   * @type {FormField[]}
   */
  items;

  /**
   * @constructor
   * @param {FormGroup} data
   */
  constructor(data) {
    this.code = data?.code;
    this.title = data?.title;
    this.items = data?.items;
  }
}
