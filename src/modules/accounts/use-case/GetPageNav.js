import Translations from "@/translations";
import {
  ResponseException,
  NotFoundException,
  BaseUseCase,
  ObjectHelper
} from "@/core";
import {Pagination} from "@/modules/accounts/models";
import {AccountRepository} from "@/modules/accounts/repositories";
import {AccountMapper} from "@/modules/accounts/mappers";
import {
  mapPaginationValuesResponseToModel
} from "@/modules/accounts/mappers/AccountMapper";

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
   * @return {Promise<Pagination>}
   * @throws {ResponseException}
   * @throws {NotFoundException}
   */
  async execute() {
    try {
      const pageNav = AccountMapper.mapPaginationValuesResponseToModel(await this.repository.getPageNav());
      if (ObjectHelper.isEmpty(pageNav)) {
        throw new NotFoundException(t('accounts.useCase.getPageNavErrorMessage'));
      }
      return pageNav;
    } catch (/** @type {ResponseException|NotFoundException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
