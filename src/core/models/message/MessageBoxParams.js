import { ResponseStatus } from "@/core/enums";

/**
 * @class
 */
export default class MessageBoxParams {
  /**
   * @public
   * @type {String}
   */
  title;
  /**
   * @public
   * @type {String}
   */
  message;
  /**
   * @public
   * @type {ResponseStatus|String}
   */
  type;
  /**
   * @public
   * @type {VoidFunction}
   */
  callback;

  /**
   * @constructor
   * @param {MessageBoxParams} data
   */
  constructor(data) {
    this.title = data?.title;
    this.message = data?.message;
    this.type = ResponseStatus[data?.type];
    this.callback = data?.callback;
  }
}
