export default class AccountUpdateFileModel {
  /**
   * @type {Number}
   */
  id;
  /**
   * @type {Object}
   */
  file;
  /**
   * @type {String}
   */
  name;
  /**
   * @type {String}
   */
  url;

  /**
   * @param {AccountUpdateFileModel} data
   */
  constructor(data = null) {
    this.file = data?.file;
    this.name = data?.name;
    this.url = data?.url;
  }
}
