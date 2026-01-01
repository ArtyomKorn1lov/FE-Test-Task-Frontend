import { ResponseException, ValidationException, CommonResponse, ValidationProvider, BaseUseCase } from '@/core';
import { AccountCreate } from '@/modules/accounts/models';
import { AccountRepository } from '@/modules/accounts/repositories';

/**
 * @final
 * @extends BaseUseCase
 */
export default class CreateAccount extends BaseUseCase {
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
   * @param {AccountCreate} object
   * @return {Promise<CommonResponse>}
   * @throws {ResponseException}
   * @throws {ValidationException}
   */
  async execute(object) {
    try {
      this.validationProvider.checkRequired(object.login, 'login');
      this.validationProvider.checkRequired(object.email, 'email');
      this.validationProvider.checkEmail(object.email, 'email');
      this.validationProvider.checkRequired(object.role, 'role');
      return await this.repository.create(object);
    } catch (/** @type {ResponseException|ValidationException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
