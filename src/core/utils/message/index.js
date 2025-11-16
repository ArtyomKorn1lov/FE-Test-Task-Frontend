import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { ResponseStatus } from "@/core/enums";
import useTranslation from "@/core/composable/useTranslation.js";
import { MessageBoxParams, NotificationParams, MessageConfirmParams } from "@/core/models";

const translation = useTranslation('core');

/**
 * @param {MessageBoxParams} args
 * @return {Promise<void>}
 */
export const showMessageBox = async ({title = translation.value.messages.errorTitle, message, type = ResponseStatus.error, callback = null}) => {
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
      confirmButtonText: translation.value.messages.confirmButtonText,
      callback: callback
    });
}

/**
 * @param {NotificationParams} args
 * @return {void}
 */
export const showNotification = ({title = translation.value.messages.errorTitle, message, type =  ResponseStatus.error}) => {
  ElNotification({
    title: title,
    message: message,
    type: type,
  });
}

/**
 * @param {MessageConfirmParams} args
 * @return {void}
 */
export const showConfirmMessageBox = async ({title, message, callback, cancelMessage = 'Canceled'}) => {
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
