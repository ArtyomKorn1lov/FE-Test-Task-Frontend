export default class NextPage {
  /**
   * @public
   * @type {Number}
   * */
  page;

  /**
   * @constructor
   * @param {NextPage|null} data
   */
  constructor(data = null) {
    this.page = data?.page
  }
}
