export default class MessageConfirmParams {
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
   * @type {VoidFunction}
   */
  callback;
  /**
   * @public
   * @type {String}
   */
  cancelMessage;

  /**
   * @constructor
   * @param {MessageConfirmParams} data
   */
  constructor(data) {
    this.title = data?.title;
    this.message = data?.message;
    this.callback = data?.callback;
    this.cancelMessage = data?.cancelMessage;
  }
}
