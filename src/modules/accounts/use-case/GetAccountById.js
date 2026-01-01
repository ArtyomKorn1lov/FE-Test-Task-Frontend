import { ResponseException, ArgumentException, BaseUseCase } from '@/core';
import { AccountUpdate } from '@/modules/accounts/models';
import { AccountRepository } from '@/modules/accounts/repositories';
import Translations from '@/translations/index.js';

const t = Translations.global.t;

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
      if (!id) {
        throw new ArgumentException(t('accounts.useCase.getAccountByIdErrorMessage'));
      }
      return await this.repository.getById(id);
    } catch (/** @type {ResponseException|ArgumentException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
