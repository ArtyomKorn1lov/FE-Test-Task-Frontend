import { ResponseException, BaseUseCase } from '@/core';
import { AccountUpdate } from '@/modules/accounts/models';
import { AccountRepository } from '@/modules/accounts/repositories';

/**
 * @final
 * @extends BaseUseCase
 */
export default class GetAccountById extends BaseUseCase {
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
   * @param {Number} id
   * @return {Promise<AccountUpdate>}
   */
  async execute(id) {
    try {
      return await this.repository.getById(id);
    } catch (/** @type {ResponseException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
