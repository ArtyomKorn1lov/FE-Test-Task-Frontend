import Translations from "@/translations";
import {
  ResponseException,
  NotFoundException,
  BaseUseCase,
  ObjectHelper
} from "@/core";
import {Filter} from "@/modules/accounts/models";
import {AccountRepository} from "@/modules/accounts/repositories";
import {AccountMapper} from "@/modules/accounts/mappers";

const t = Translations.global.t;

export default class GetFilterValues extends BaseUseCase {
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
   * @return {Promise<Filter>}
   * @throws {ResponseException}
   * @throws {NotFoundException}
   */
  async execute() {
    try {
      const filter = AccountMapper.mapFilterValuesResponseToModel(await this.repository.getFilterValues());
      if (ObjectHelper.isEmpty(filter)) {
        throw new NotFoundException(t('accounts.useCase.getFilterErrorMessage'));
      }
      return filter;
    } catch (/** @type {ResponseException|NotFoundException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
