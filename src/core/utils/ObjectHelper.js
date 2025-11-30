/**
 * @param {Object} object
 * @return {Array}
 */
export const convertObjectToArray = (object) => {
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
 * @param {Object} object
 * @param {String} propCode
 * @return {Boolean}
 */
export const hasProperty = (object, propCode) => {
  return object.hasOwnProperty(propCode);
}

/**
 * @param {Object} object
 * @return {Boolean}
 */
export const isEmpty = (object) => {
  for (const key in object) {
    if (!hasProperty(object, key)) {
      continue;
    }
    return false;
  }
  return true;
}

/**
 * @param {Object} object
 * @return {Object}
 */
export const removeEmptyProperties = (object) => {
  for (const key in object) {
    if (typeof object[key] === "object") {
      object[key] = removeEmptyProperties(object[key]);
    } else if (object[key] === undefined || object[key] === null || object[key] === "") {
      delete object[key];
    }
  }
  return object;
}
