/**
 * @fileOverview
 * @description Хелпер для работы с массивами/списками
 */

/**
 * @param {Array} array
 * @return {Object}
 */
export const convertArrayToObject = (array) => {
  if (!array || array.length <= 0) {
    return {};
  }

  let object = {};
  array.forEach((item) => {
    !!item.code && (object[item.code] = item.value);
  });

  return object;
}

/**
 * @param {Array} array
 * @param {String} key
 * @param {String} newKey
 * @return {Array}
 */
export const changeArrayObjectsCode = (array, key, newKey) => {
  if (!array || array.length <= 0 || !key || !newKey) {
    return [];
  }

  return array.map((item) => {
    let obj = {};
    obj[newKey] = item[key];
    return obj;
  });
}
