import Translations from '@/translations';
import { NotFoundException, ArgumentException } from '@/core/exceptions';

const t = Translations.global.t;

/**
 * @fileOverview
 * @description Сервис для работы с env-файлами
 */

/**
 * @throws {NotFoundException}
 */
export const init = () => {
  if (!process?.env) {
    throw new NotFoundException(t('core.utils.env.initErrorMessage'));
  }
};

/**
 * @param {String} code
 * @return {String}
 * @throws {ArgumentException}
 */
export const get = (code) => {
  if (!code) {
    throw ArgumentException(t('core.utils.env.emptyArgErrorMessage'));
  }
  return process.env[code] ?? '';
};
