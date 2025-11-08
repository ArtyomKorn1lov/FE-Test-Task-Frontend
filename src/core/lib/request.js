import Formatter from "@/core/lib/helpers/formatter.js";
import FilterModel from "@/core/models/FilterModel.js";
import ContextSearchModel from "@/core/models/ContextSearchModel.js";
import { FirstElementIndex } from "@/core/lib/constants.js";

/**
 * Обработка элементов запроса
 */
export default class Request {

  /**
   * @returns {String}
   */
  static get StartQueryParams() {
    return "?";
  }

  /**
   * @returns {String}
   */
  static get SeparatorQueryParams() {
    return "&";
  }

  /**
   * @returns {String}
   */
  static get BodyQueryParams() {
    return "{0}={1}";
  }

  /**
   * Сформировать строку query параметров запроса
   * @param {FilterModel|ContextSearchModel} filter
   * @returns {String}
   */
  getQueryString(filter) {
    if (!filter) {
      return '';
    }

    let queryString = Request.StartQueryParams;
    let index = 0;
    for (const key in filter) {
      if (!filter[key]) {
        continue;
      }
      (index !== FirstElementIndex) && (queryString += Request.SeparatorQueryParams);
      queryString += Formatter.stringInject(Request.BodyQueryParams, [key, filter[key]]);
      index++;
    }

    return queryString;
  }

  /**
   * Преобразовать файл в base64, для отправки его в json-теле запроса
   * @param {File} file
   * @returns {Promise}
   */
  convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }
}
