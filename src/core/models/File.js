export default class File {
  /**
   * @public
   * @type {Number}
   */
  id;
  /**
   * @public
   * @type {Object}
   */
  file;
  /**
   * @public
   * @type {String}
   */
  name;
  /**
   * @public
   * @type {String}
   */
  url;

  /**
   * @constructor
   * @param {File} data
   */
  constructor(data = null) {
    this.file = data?.file;
    this.name = data?.name;
    this.url = data?.url;
  }
}
