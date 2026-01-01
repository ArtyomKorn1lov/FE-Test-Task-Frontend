/**
 * @fileOverview
 * @description Хелпер для работы с объектами
 */

/**
 * @param {any} object
 * @return {Boolean}
 */
export const isObject = (object) => {
  return typeof object === 'object';
};

/**
 * @param {Object} object
 * @return {Array}
 */
export const convertObjectToArray = (object) => {
  if (!object) {
    return [];
  }

  let array = [];
  for (const key in object) {
    !!object[key] &&
      array.push({
        code: key,
        value: object[key],
      });
  }

  return array;
};

/**
 * @param {Object} object
 * @param {String} propCode
 * @return {Boolean}
 */
export const hasProperty = (object, propCode) => {
  return Object.hasOwn(object, propCode);
};

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
};

/**
 * @param {Object} object
 * @return {Object}
 */
export const removeEmptyProperties = (object) => {
  for (const key in object) {
    if (isObject(object[key])) {
      object[key] = removeEmptyProperties(object[key]);
    } else if (object[key] === undefined || object[key] === null || object[key] === '') {
      delete object[key];
    }
  }
  return object;
};

/**
 * @param {Object} obj
 * @return {any[]}
 */
export const getAllProperties = (obj) => {
  const props = new Set();
  let current = obj;

  while (current && current !== Object.prototype) {
    Object.getOwnPropertyNames(current).forEach((prop) => props.add(prop));
    current = Object.getPrototypeOf(current);
  }

  return Array.from(props).filter((prop) => prop !== 'constructor');
};

/**
 * @param {Object} obj
 * @param {Class} className
 * @return {Boolean}
 */
export const isCompatibleWithClass = (obj, className) => {
  if (!isObject(obj) || obj === null) {
    return false;
  }

  if (!(obj instanceof className)) {
    return false;
  }

  const instance = new className();

  const classProps = getAllProperties(instance);
  const objProps = getAllProperties(obj);

  return classProps.every((prop) => objProps.includes(prop));
};
