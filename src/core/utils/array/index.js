/**
 * @param {Array} array
 * @return {Object}
 */
const convertArrayToObject = (array) => {
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
 * @param {Object} object
 * @return {Array}
 */
const convertObjectToArray = (object) => {
  if (!!object) {
    return [];
  }

  let array = [];
  for (const key in object) {
    !!object[key] && (array.push({
      code: key,
      value: object[key]
    }));
  }

  return array;
}

/**
 * @param {Array} array
 * @param {String} key
 * @param {String} newKey
 * @return {Array}
 */
const changeArrayObjectsCode = (array, key, newKey) => {
  if (!array || array.length <= 0 || !key || !newKey) {
    return [];
  }

  return array.map((item) => {
    let obj = {};
    obj[newKey] = item[key];
    return obj;
  });
}
