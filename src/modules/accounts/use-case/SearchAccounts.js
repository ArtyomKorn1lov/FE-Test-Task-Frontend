import { ResponseException, BaseUseCase } from '@/core';
import { ContextSearch, ContextSearchResponse } from '@/modules/accounts/models';
import { AccountRepository } from '@/modules/accounts/repositories';

/**
 * @final
 * @extends BaseUseCase
 */
export default class SearchAccounts extends BaseUseCase {
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
   * @param {ContextSearch} object
   * @return {Promise<ContextSearchResponse[]>}
   */
  async execute(object) {
    try {
      return await this.repository.search(object);
    } catch (/** @type {ResponseException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
