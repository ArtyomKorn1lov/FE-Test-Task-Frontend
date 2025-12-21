import { ResponseException, ValidationException, CommonResponse, ValidationProvider, BaseUseCase } from '@/core';
import { AccountDelete } from '@/modules/accounts/models';
import { AccountRepository } from '@/modules/accounts/repositories';

/**
 * @final
 * @extends BaseUseCase
 */
export default class DeleteAccount extends BaseUseCase {
  /**
   * @private
   * @type {AccountRepository}
   */
  repository;
  /**
   * @private
   * @type {ValidationProvider}
   */
  validationProvider;

  /**
   * @constructor
   * @param {AccountRepository} repository
   * @param {ValidationProvider} validationProvider
   */
  constructor(repository, validationProvider) {
    super();
    this.repository = repository;
    this.validationProvider = validationProvider;
  }

  /**
   * @override
   * @public
   * @param {Number} id
   * @return {Promise<CommonResponse>}
   * @throws {ResponseException}
   * @throws {ValidationException}
   */
  async execute(id) {
    try {
      this.validationProvider.checkRequired(id, 'id');
      return await this.repository.delete(id);
    } catch (/** @type {ResponseException|ValidationException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
