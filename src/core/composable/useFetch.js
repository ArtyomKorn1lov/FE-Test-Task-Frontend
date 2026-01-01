import Translations from '@/translations';
import { ArgumentException } from '@/core/exceptions';
import { MessageTypes } from '@/core/enums';
import { MessageHelper } from '@/core/utils';
import { BaseUseCase } from '@/core/use-case';

const t = Translations.global.t;

/**
 * @description Примесь с общей логикой обработки запросов, вывод всплывающего окна сообщения об ошибке
 * @param {Function} ajaxFunc
 * @param {BaseUseCase} useCase
 * @param {Boolean} showMessage
 * @param {MessageTypes|String} messageType
 * @return {(function(...args): Promise<any>)}
 */
export default function useFetch({ ajaxFunc = null, useCase = null, showMessage = true, messageType = MessageTypes.notification }) {
  /**
   * @param {String} message
   * @return {Promise<void>}
   */
  const displayMessage = async (message) => {
    switch (messageType) {
      case MessageTypes.messageBox:
        await MessageHelper.showMessageBox({
          message: message,
        });
        break;
      default:
        MessageHelper.showNotification({
          message: message,
        });
        break;
    }
  };

  /**
   * @param {any} args
   * @return {(function(...args): Promise<any>)}
   * @throws {ArgumentException|Error}
   */
  return async (...args) => {
    try {
      if (!useCase && !ajaxFunc) {
        throw new ArgumentException(t('core.composable.emptyRequestMethod'));
      } else if (useCase) {
        return await useCase.execute(...args);
      }
      return await ajaxFunc(...args);
    } catch (/** @type {Error} */ exception) {
      if (showMessage) {
        await displayMessage(exception?.message);
      }
      throw exception;
    }
  };
}
