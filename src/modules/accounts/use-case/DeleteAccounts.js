import { ResponseException, ValidationException, CommonResponse, ValidationProvider, BaseUseCase } from '@/core';
import { AccountDelete } from '@/modules/accounts/models';
import { AccountRepository } from '@/modules/accounts/repositories';

/**
 * @final
 * @extends BaseUseCase
 */
export default class DeleteAccounts extends BaseUseCase {
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
   * @param {AccountDelete} object
   * @return {Promise<CommonResponse>}
   * @throws {ResponseException}
   * @throws {ValidationException}
   */
  async execute(object) {
    try {
      this.validationProvider.checkRequired(object.ids, 'ids');
      return await this.repository.deleteItems(object);
    } catch (/** @type {ResponseException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
