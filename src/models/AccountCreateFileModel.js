export default class AccountCreateFileModel {
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
   * @param {AccountCreateFileModel} data
   */
  constructor(data = null) {
    this.file = data?.file;
    this.name = data?.name;
    this.url = data?.url;
  }
}
