import {RequestConfig} from "@/core/models";
import {RequestTypes} from "@/core/enums";
import BaseApiClient from "@/core/api-client/BaseApiClient";

/**
 * @description API-клиент
 */
export default class ApiClient extends BaseApiClient {
  /**
   * @public
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async post(url, config = new RequestConfig()) {
    return await this.executeRequest(url, {
      ...config,
      requestType: RequestTypes.post
    });
  }

  /**
   * @public
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async put(url, config = new RequestConfig()) {
    return await this.executeRequest(url, {
      ...config,
      requestType: RequestTypes.put
    });
  }

  /**
   * @public
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async delete(url, config = new RequestConfig()) {
    return await this.executeRequest(url, {
      ...config,
      requestType: RequestTypes.delete
    });
  }

  /**
   * @public
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async get(url, config = new RequestConfig()) {
    return await this.executeRequest(url, {
      ...config,
      requestType: RequestTypes.get
    });
  }
}
