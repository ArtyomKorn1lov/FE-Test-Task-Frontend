import { ElMessageBox, ElMessage } from 'element-plus';

/**
 * Сформировать html иконки-спрайта
 * @param {string|null} code
 * @param {string} prefix
 */
export const getIcon = (code, prefix = 'icon') => {
  if (!code) {
    return '';
  }
  return `<svg aria-hidden='true'><use href='#${prefix}-${code}'/></svg>`
}

/**
 * Всплывающее окно для подтверждения действий в системе
 * @param {String} title
 * @param {String} message
 * @param {Function} callback
 * @param {String} cancelMessage
 */
export const confirmedAction = (title, message, callback, cancelMessage = 'Canceled') => {
  ElMessageBox.confirm(
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
