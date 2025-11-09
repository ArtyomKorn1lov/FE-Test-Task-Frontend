import { RequestConfig } from "@/core/models";
import { RequestTypes } from "@/core/enums";
import BaseApiClient from "@/core/api/BaseApiClient.js";

/**
 * @description API-клиент
 */
class ApiClient extends BaseApiClient {
  /**
   * @public
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async postRequest(url, config) {
    return await this.executeRequest(url, {...config, requestType: RequestTypes.post});
  }

  /**
   * @public
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async putRequest(url, config) {
    return await this.executeRequest(url, {...config, requestType: RequestTypes.put});
  }

  /**
   * @public
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async deleteRequest(url, config) {
    return await this.executeRequest(url, {...config, requestType: RequestTypes.delete});
  }

  /**
   * @public
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async getRequest(url, config) {
    return await this.executeRequest(url, {...config, requestType: RequestTypes.get});
  }
}

export default new ApiClient(process.env.REST_API_URL ?? "/");
