import FormGroup from "@/modules/forms/models/fields/FormGroup";

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
