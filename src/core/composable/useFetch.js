import { ref, Ref } from 'vue';
import { MessageTypes } from "@/core/enums";
import { NotificationParams, MessageBoxParams } from "@/core/models";
import { MessageHelper } from "@/core/utils";

/**
 * @param {Promise<any>} ajaxFunc
 * @param {Boolean} showMessage
 * @param {MessageTypes|String} messageType
 * @param {any} args
 * @return {(function(): Promise<any>)}
 */
export default function useFetch({ajaxFunc, showMessage = true, messageType = MessageTypes.notification, ...args}) {
  /**
   * @type {Ref<Boolean>}
   */
  const isLoading = ref(false);

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

  return async () => {
    try {
      isLoading.value = true;
      const result = await ajaxFunc(...args);
      isLoading.value = false;
      return result;
    } catch (exception) {
      isLoading.value = false;
      await displayMessage(exception?.message);
      throw exception;
    }
  };
}
