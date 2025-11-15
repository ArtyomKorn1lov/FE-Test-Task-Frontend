export default class Role {
  /**
   * @public
   * @type {Number}
   */
  id;
  /**
   * @public
   * @type {String}
   */
  name;
  /**
   * @public
   * @type {String}
   */
  code;

  /**
   * @constructor
   * @param {Role} data
   */
  constructor(data = null) {
    this.id = data?.id;
    this.name = data?.name;
    this.code = data?.code;
  }
}
