import {ResponseException, BaseUseCase} from "@/core";
import {Pagination} from "@/modules/accounts";
import {AccountRepository} from "@/modules/accounts/repositories";

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
   */
  async execute() {
    try {
      //TODO перенести бизнес-логику
      return await this.repository.getPageNav();
    } catch (/** @type {ResponseException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
