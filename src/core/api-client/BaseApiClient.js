import axios from "axios";
import {BodyTypes, RequestTypes} from "@/core/enums";
import {ResponseException} from "@/core/exceptions";
import {RequestConfig} from "@/core/models";
import useTranslation from "@/core/composable/useTranslation";

const translation = useTranslation('core');

/**
 * @abstract
 * @description абстрактный класс API-клиента
 */
export default class BaseApiClient {
  /**
   * @protected
   * @type {String}
   */
  apiUrl;

  /**
   * @constructor
   * @param {String} apiUrl
   */
  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }

  /**
   * @protected
   * @param {String} url
   * @param {Object} params
   * @return {String}
   */
  #prepareUrl(url, params = null) {
    let queryString = "";
    if (!!params) {
      queryString = '?' + new URLSearchParams(params);
    }
    return `${this.apiUrl}${url}${queryString}`;
  }

  /**
   * @protected
   * @param {FormData} formData
   * @param {any} data
   * @param {String} parentKey
   * @return {void}
   */
  buildFormData(formData, data, parentKey = '') {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }
  }

  /**
   * @protected
   * @param {any} data
   * @return {FormData}
   */
  jsonToFormData(data) {
    const formData = new FormData();
    this.buildFormData(formData, data);
    return formData;
  }

  /**
   * @protected
   * @param {any} data
   * @param {String} dataType
   * @return {any}
   */
  setPayload(data, dataType = 'json') {
    switch (dataType) {
      case BodyTypes.formData:
        data = this.jsonToFormData(data);
        break;
      default:
        break;
    }
    return data;
  }

  /**
   * @protected
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async buildRequest(url, {
    data,
    dataType = BodyTypes.json,
    params = null,
    headers = {},
    requestType = RequestTypes.post
  }) {
    const requestUrl = this.#prepareUrl(url, params);

    const payload = !!data ? this.setPayload(data, dataType) : {};
    const config = {}
    headers && (config.headers = {...headers});

    switch (requestType) {
      case RequestTypes.get:
        return await axios.get(requestUrl, config);
      case RequestTypes.put:
        return await axios.put(requestUrl, payload, config);
      case RequestTypes.delete:
        return await axios.delete(requestUrl, config);
      default:
        return await axios.post(requestUrl, payload, config);
    }
  }

  /**
   * @protected
   * @param {any} response
   * @return {any}
   * @throws {ResponseException}
   */
  createSuccess(response) {
    if (!response) {
      throw new ResponseException({
        message: translation.value.serverError,
        status: 500
      });
    }
    return response?.data;
  }

  /**
   * @protected
   * @param {any} error
   * @throws {ResponseException}
   */
  async createError(error) {
    throw new ResponseException({
      message: error?.message,
      status: error?.status
    });
  }

  /**
   * @protected
   * @param {String} url
   * @param {RequestConfig} config
   * @return {Promise<any>}
   */
  async executeRequest(url, config) {
    try {
      return this.createSuccess(await this.buildRequest(url, config));
    } catch (error) {
      await this.createError(error);
    }
  }
}
