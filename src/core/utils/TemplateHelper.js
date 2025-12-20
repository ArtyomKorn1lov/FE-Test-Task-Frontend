import Translations from '@/translations';
import { ArgumentException } from '@/core/exceptions';

const t = Translations.global.t;

/**
 * @fileOverview
 * @description Хелпер для работы с шаблоном HTML
 */

/**
 * @param {String|null} code
 * @param {String} prefix
 */
export const getIcon = (code, prefix = 'icon') => {
  if (!code) {
    throw new ArgumentException(t('core.utils.template.emptyIconErrorMessage'));
  }
  return `<svg aria-hidden='true'><use href='#${prefix}-${code}'/></svg>`;
};

/**
 * @param {String} className
 * @return {Element}
 */
export const getElementByClassName = (className) => {
  if (!className) {
    throw new ArgumentException(t('core.utils.template.emptyCodeErrorMessage'));
  }
  return document.querySelector(`.${className}`);
};
