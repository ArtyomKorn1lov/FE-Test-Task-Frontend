import {
  ApiClient,
  ResponseException,
  RequestConfig,
  CommonResponse
} from "@/core";
import {
  Filter,
  Pagination,
  Role,
  Account,
  AccountCreate,
  AccountUpdate,
  AccountDelete,
  ContextSearch,
  ContextSearchResponse
} from "@/modules/accounts/models";

/**
 * @final
 */
export default class AccountRepository {
  /**
   * @private
   * @type {ApiClient}
   */
  apiClient;

  /**
   * @constructor
   * @param {ApiClient} apiClient
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * @public
   * @return {Promise<Filter>}
   * @throws {ResponseException}
   */
  async getFilterValues() {
    return await this.apiClient.getRequest("/accounts/filter-values");
  }

  /**
   * @public
   * @return {Promise<Pagination>}
   * @throws {ResponseException}
   */
  async getPageNav() {
    return await this.apiClient.getRequest("/accounts/page-nav");
  }

  /**
   * @public
   * @return {Promise<Role[]>}
   * @throws {ResponseException}
   */
  async getRoles() {
    return await this.apiClient.getRequest("/accounts/roles");
  }

  /**
   * @public
   * @param {ContextSearch} contextSearch
   * @return {Promise<ContextSearchResponse[]>}
   * @throws {ResponseException}
   */
  async search(contextSearch) {
    return await this.apiClient.getRequest(
      "/accounts/search",
      new RequestConfig({
        params: contextSearch
      })
    );
  }

  /**
   * @public
   * @param {Filter} filter
   * @param {Pagination|null} pageNav
   * @return {Promise<Account[]>}
   * @throws {ResponseException}
   */
  async getList(filter, pageNav = null) {
    return await this.apiClient.getRequest(
      "/accounts/list",
      new RequestConfig({
        params: {...filter, ...pageNav}
      })
    );
  }

  /**
   * @public
   * @param {Number} id
   * @return {Promise<AccountUpdate>}
   * @throws {ResponseException}
   */
  async getById(id) {
    return await this.apiClient.getRequest(`/accounts/${id}`);
  }

  /**
   * @public
   * @param {AccountCreate} object
   * @return {Promise<CommonResponse>}
   * @throws {ResponseException}
   */
  async create(object) {
    return await this.apiClient.postRequest(
      "/accounts/create",
      new RequestConfig({
        data: object
      })
    );
  }

  /**
   * @public
   * @param {AccountUpdate} object
   * @return {Promise<CommonResponse>}
   * @throws {ResponseException}
   */
  async update(object) {
    return await this.apiClient.putRequest(
      "/accounts/edit",
      new RequestConfig({
        data: object
      })
    );
  }

  /**
   * @public
   * @param {AccountDelete} object
   * @return {Promise<CommonResponse>}
   * @throws {ResponseException}
   */
  async delete(object) {
    return await this.apiClient.deleteRequest(
      "/accounts/delete",
      new RequestConfig({
        data: object
      })
    );
  }
}
