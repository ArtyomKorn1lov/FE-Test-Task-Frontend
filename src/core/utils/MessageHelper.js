import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import Translations from "@/translations";
import {ResponseStatus} from "@/core/enums";

const t = Translations.global.t;

/**
 * @param {{ title: String, message: String, type: String|ResponseStatus, callback: VoidFunction }} args
 * @return {Promise<void>}
 */
export const showMessageBox = async (
  {
    title = t('core.messages.errorTitle'),
    message,
    type = ResponseStatus.error,
    callback = null
  }
) => {
  await ElMessageBox.alert(
    message,
    title,
    {
      customClass: "b-message-box",
      showClose: type === ResponseStatus.success,
      center: true,
      type: type,
      closeOnPressEscape: type === ResponseStatus.success,
      closeOnHashChange: type === ResponseStatus.success,
      showConfirmButton: true,
      confirmButtonClass: "b-btn b-btn_primary b-btn_normal b-btn_full",
      confirmButtonText: t('core.messages.confirmButtonText'),
      callback: callback
    });
}

/**
 * @param {{ title: String, message: String, type: String|ResponseStatus }} args
 * @return {void}
 */
export const showNotification = (
  {
    title = t('core.messages.errorTitle'),
    message,
    type = ResponseStatus.error
  }
) => {
  ElNotification({
    title: title,
    message: message,
    type: type,
  });
}

/**
 * @param {{ title: String, message: String, callback: VoidFunction, cancelMessage: String }} args
 * @return {void}
 */
export const showConfirmMessageBox = async (
  {
    title,
    message,
    callback,
    cancelMessage = 'Canceled'
  }
) => {
  await ElMessageBox.confirm(
    message,
    title,
    {
      customClass: "b-message-box b-message-box_confirm",
      type: 'warning',
      confirmButtonText: 'Confirm',
      confirmButtonClass: "b-btn b-btn_primary b-btn_normal",
      cancelButtonClass: "b-btn b-btn_secondary b-btn_normal",
      cancelButtonText: 'Cancel',
    }
  )
    .then(() => {
      callback();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: cancelMessage,
      });
    });
}
