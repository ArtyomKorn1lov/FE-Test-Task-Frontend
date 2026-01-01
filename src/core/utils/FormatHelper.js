/**
 * @fileOverview
 * @description Хелпер для форматирования строк
 */

/**
 * @param {String} phone
 * @return {String}
 */
export const normalizePhone = (phone) => {
  if (!phone) {
    return '';
  }
  return phone.replace(/[^\d+]/g, '');
};
