export default class SelectItemModel {
  /** @type {Boolean} */
  value;
  /** @type {Number} */
  id;

  /**
   * @param {SelectItemModel|null} data
   */
  constructor(data = null) {
    this.value = data?.value;
    this.id = data?.id;
  }
}
