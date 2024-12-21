export default class QueryParamModel {
  /**
   * @type {String}
   */
  code;
  /**
   * @type {String}
   */
  value;

  /**
   * @param {QueryParamModel|null} data
   */
  constructor(data = null) {
    this.code = data?.code;
    this.value = data?.value;
  }
}
