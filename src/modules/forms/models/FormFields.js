import FormGroup from "@/modules/forms/models/FormGroup.js";

export default class FormFields {
  /**
   * @public
   * @type {FormGroup[]}
   */
  groups;

  /** @param {FormFields} data  */
  constructor(data) {
    this.groups = data?.groups;
  }
}
