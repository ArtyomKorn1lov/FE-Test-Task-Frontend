import { ElMessageBox, ElNotification } from "element-plus";
import { ResponseStatus } from "@/core/enums";
import useTranslation from "@/core/composable/translations";
import { MessageBoxParams, NotificationParams } from "@/core/models";

const loc = useTranslation('messages');

/**
 * @param {MessageBoxParams} args
 * @return {Promise<void>}
 */
export const showMessageBox = async ({title = loc.value.errorTitle, message, type = ResponseStatus.error, callback = null}) => {
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
      confirmButtonText: loc.value.confirmButtonText,
      callback: callback
    });
}

/**
 * @param {NotificationParams} args
 * @return {void}
 */
export const showNotification = ({title, message, type =  ResponseStatus.error}) => {
  ElNotification({
    title: title,
    message: message,
    type: type,
  });
}
