/**
 * Форматирование строк
 */
export default class Formatter {

  /**
   * Внедрить массив или объект элементов в строку, заменив выбранные значения. Функция взята из библиотеки 'stringinject'.
   * @param {String} str
   * @param {String} data
   * @returns {String|Boolean}
   */
  static stringInject(str, data) {
    if (typeof str === 'string' && data instanceof Array) {

      return str.replace(/({\d})/g, function (i) {
        return data[i.replace(/{/, '').replace(/}/, '')];
      });
    } else if (typeof str === 'string' && data instanceof Object) {

      if (Object.keys(data).length === 0) {
        return str;
      }

      for (var key in data) {
        return str.replace(/({([^}]+)})/g, function (i) {
          var key = i.replace(/{/, '').replace(/}/, '');
          if (!data[key]) {
            return i;
          }

          return data[key];
        });
      }
    } else if (typeof str === 'string' && data instanceof Array === false || typeof str === 'string' && data instanceof Object === false) {
      return str;
    } else {

      return false;
    }
  }
}
