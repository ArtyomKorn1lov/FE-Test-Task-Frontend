export default class NextPageModel {
  /** @type {Number} */
  page;

  /**
   * @param {NextPageModel|null} data
   */
  constructor(data = null) {
    this.page = data?.page
  }
}
