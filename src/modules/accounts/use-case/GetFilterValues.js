import {ResponseException, BaseUseCase} from "@/core";
import {Filter} from "@/modules/accounts";
import {AccountRepository} from "@/modules/accounts/repositories";

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
   */
  async execute() {
    try {
      //TODO перенести бизнес-логику
      return await this.repository.getFilterValues();
    } catch (/** @type {ResponseException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
