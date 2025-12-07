import {ArgumentException} from "@/core/exceptions";

/**
 * @param {String|null} code
 * @param {String} prefix
 */
export const getIcon = (code, prefix = 'icon') => {
  if (!code) {
    throw new ArgumentException("Icon code can not be empty");
  }
  return `<svg aria-hidden='true'><use href='#${prefix}-${code}'/></svg>`
}

/**
 * @param {String} className
 * @return {Element}
 */
export const getElementByClassName = (className) => {
  if (!className) {
    throw new ArgumentException("Page element code can not be empty");
  }
  return document.querySelector(`.${className}`);
}
