import Translations from '@/translations';
import { ResponseException, ValidationException, ValidationProvider, BaseUseCase, ObjectHelper } from '@/core';
import { Filter } from '@/modules/accounts/models';
import { AccountRepository } from '@/modules/accounts/repositories';
import { AccountMapper } from '@/modules/accounts/mappers';

const t = Translations.global.t;

export default class GetFilterValues extends BaseUseCase {
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
   * @return {Promise<Filter>}
   * @throws {ResponseException}
   * @throws {ValidationException}
   */
  async execute() {
    try {
      const filter = AccountMapper.mapFilterValuesResponseToModel(await this.repository.getFilterValues());
      this.validationProvider.checkRequired(filter);
      return filter;
    } catch (/** @type {ResponseException|ValidationException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
