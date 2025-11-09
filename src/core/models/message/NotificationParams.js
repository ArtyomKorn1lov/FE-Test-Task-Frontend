import { ResponseStatus } from "@/core/enums";

export default class NotificationParams {
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
   * @constructor
   * @param {NotificationParams} data
   */
  constructor(data) {
    this.title = data?.title;
    this.message = data?.message;
    this.type = ResponseStatus[data?.type];
  }
}
