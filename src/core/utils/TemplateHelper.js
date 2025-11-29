/**
 * @param {String|null} code
 * @param {String} prefix
 */
export const getIcon = (code, prefix = 'icon') => {
  if (!code) {
    return '';
  }
  return `<svg aria-hidden='true'><use href='#${prefix}-${code}'/></svg>`
}
