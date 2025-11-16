import {MessageTypes} from "@/core/enums";
import {MessageBoxParams, NotificationParams} from "@/core/models";
import {MessageHelper} from "@/core/utils";

/**
 * @param {Function} ajaxFunc
 * @param {Boolean} showMessage
 * @param {MessageTypes|String} messageType
 * @return {(function(...args): Promise<any>)}
 */
export default function useFetch(
  {
    ajaxFunc,
    showMessage = true,
    messageType = MessageTypes.notification
  }
) {

  /**
   * @param {String} message
   * @return {Promise<void>}
   */
  const displayMessage = async (message) => {
    switch (messageType) {
      case MessageTypes.messageBox:
        await MessageHelper.showMessageBox(new MessageBoxParams({
          message: message
        }));
        break;
      default:
        MessageHelper.showNotification(new NotificationParams({
          message: message
        }));
        break;
    }
  }

  /**
   * @param {any} args
   * @return {(function(...args): Promise<any>)}
   */
  return async (...args) => {
    try {
      return await ajaxFunc(...args);
    } catch (exception) {
      if (showMessage) {
        await displayMessage(exception?.message);
      }
      throw exception;
    }
  };
}
