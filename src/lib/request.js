import Formatter from "@/lib/helpers/formatter";
import QueryParamModel from "@/models/QueryParamModel";
import { FirstElementIndex } from "@/lib/constants";

export default class Request {

  static get StartQueryParams() {
    return "?";
  }

  static get SeparatorQueryParams() {
    return "&";
  }

  static get BodyQueryParams() {
    return "{0}={1}";
  }

  /**
   * Сформировать строку query параметров запроса
   * @param {Array<QueryParamModel>} queryParams
   * @returns
   */
  getQueryString(queryParams) {
    if (!queryParams || queryParams.length <= 0) {
      return '';
    }

    let queryString = Request.StartQueryParams;
    queryParams.forEach((item, key) => {
      (key !== FirstElementIndex) && (queryString += Request.SeparatorQueryParams);
      queryString += Formatter.stringInject(Request.BodyQueryParams, [item.code, item.value]);
    });

    return queryString;
  }
}
