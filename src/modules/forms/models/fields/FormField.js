import FormFieldValue from "@/modules/forms/models/fields/FormFieldValue";

export default class FormField {
  /**
   * @public
   * @type {Number}
   */
  id;
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
   * @type {String}
   */
  type;
  /**
   * @public
   * @type {String}
   */
  placeholder;
  /**
   * @public
   * @type {Boolean}
   */
  required;
  /**
   * @public
   * @type {FormFieldValue[]|String|Number|Boolean}
   */
  value;

  /**
   * @constructor
   * @param {FormField} data
   */
  constructor(data) {
    this.id = data?.id;
    this.code = data?.code;
    this.title = data?.title;
    this.type = data?.type;
    this.placeholder = data?.placeholder;
    this.required = data?.required;
    this.value = data?.value;
  }
}
