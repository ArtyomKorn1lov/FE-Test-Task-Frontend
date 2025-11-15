import { RequestTypes, BodyTypes } from "@/core/enums";

export default class RequestConfig {
  /**
   * @public
   * @type {any}
   */
  data;
  /**
   * @public
   * @type {BodyTypes|String}
   */
  dataType;
  /**
   * @public
   * @type {Object}
   */
  params;
  /**
   * @public
   * @type {Object}
   */
  headers;
  /**
   * @public
   * @type {RequestTypes|String}
   */
  requestType;

  /**
   * @constructor
   * @param {RequestConfig|null} data
   */
  constructor(data = null) {
    this.data = data?.data;
    this.dataType = data?.dataType;
    this.params = data?.params;
    this.headers = data?.headers;
    this.requestType = data?.requestType;
  }
}
