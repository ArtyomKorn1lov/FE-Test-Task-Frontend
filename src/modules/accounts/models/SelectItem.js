export default class SelectItem {
  /**
   * @public
   * @type {Boolean}
   * */
  value;
  /**
   * @public
   * @type {Number}
   * */
  id;

  /**
   * @constructor
   * @param {SelectItem|null} data
   */
  constructor(data = null) {
    this.value = data?.value;
    this.id = data?.id;
  }
}
