import {
  ResponseException,
  NotFoundException,
  BaseUseCase,
  ObjectHelper
} from "@/core";
import {Filter} from "@/modules/accounts";
import {AccountRepository} from "@/modules/accounts/repositories";
import {AccountMapper} from "@/modules/accounts/mappers";

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
      //TODO перенести бизнес-логику
      const filter = AccountMapper.mapFilterValuesResponseToModel(await this.repository.getFilterValues());
      if (ObjectHelper.isEmpty(filter)) {
        throw new NotFoundException("Filter values cannot be empty");
      }
      return filter;
    } catch (/** @type {ResponseException|NotFoundException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
