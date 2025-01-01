import Formatter from "@/lib/helpers/formatter";
import FilterModel from "@/models/FilterModel";
import { FirstElementIndex } from "@/lib/constants";

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
   * @param {FilterModel} filter
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
}
