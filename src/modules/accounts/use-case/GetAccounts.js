import {ResponseException, BaseUseCase} from "@/core";
import {Account, Filter, Pagination} from "@/modules/accounts";
import {AccountRepository} from "@/modules/accounts/repositories";

/**
 * @final
 * @extends BaseUseCase
 */
export default class GetAccounts extends BaseUseCase {
  /**
   * @private
   * @type {AccountRepository}
   */
  repository;

  /**
   * @constructor
   * @param {AccountRepository} repository
   */
  constructor(repository) {
    super();
    this.repository = repository;
  }

  /**
   * @override
   * @public
   * @param {Filter} filter
   * @param {Pagination} pagination
   * @return {Promise<Account[]>}
   */
  async execute(filter, pagination) {
    try {
      //TODO перенести бизнес-логику
      return await this.repository.getList(filter, pagination);
    } catch (/** @type {ResponseException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
