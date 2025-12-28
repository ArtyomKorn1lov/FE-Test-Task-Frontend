import Translations from '@/translations';
import { ResponseException, ValidationException, BaseUseCase, ObjectHelper } from '@/core';
import { Pagination } from '@/modules/accounts/models';
import { AccountRepository } from '@/modules/accounts/repositories';
import { AccountMapper } from '@/modules/accounts/mappers';

const t = Translations.global.t;

/**
 * @final
 * @extends BaseUseCase
 */
export default class GetPageNav extends BaseUseCase {
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
   * @return {Promise<Pagination>}
   * @throws {ResponseException}
   * @throws {ValidationException}
   */
  async execute() {
    try {
      const pageNav = AccountMapper.mapPaginationValuesResponseToModel(await this.repository.getPageNav());
      this.validationProvider.checkRequired(pageNav.page, 'page');
      this.validationProvider.checkRequired(pageNav.pageCount, 'pageCount');
      return pageNav;
    } catch (/** @type {ResponseException|ValidationException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
