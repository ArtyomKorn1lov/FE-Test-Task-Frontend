/**
 * Преобразователь
 */
export default class Converter {

  /**
   * Преобразовать массив в объект
   * @param {Array} array
   * @returns {Object}
   */
  static convertArrayToObject(array) {
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
   * Преобразовать объект в массив
   * @param {Object} object
   * @returns {Array}
   */
  static convertObjectToArray(object) {
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
}
