export default class FormFieldValue {
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
  name;

  /**
   * @constructor
   * @param {FormFieldValue} data
   */
  constructor(data) {
    this.id = data?.id;
    this.code = data?.code;
    this.name = data?.name;
  }
}
