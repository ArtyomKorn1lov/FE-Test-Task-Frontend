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
