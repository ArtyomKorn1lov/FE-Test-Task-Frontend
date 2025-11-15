import {ResponseException, BaseUseCase} from "@/core";
import {Role} from "@/modules/accounts";
import {AccountRepository} from "@/modules/accounts/repositories";

/**
 * @final
 * @extends BaseUseCase
 */
export default class GetRoles extends BaseUseCase {
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
   * @return {Promise<Role[]>}
   */
  async execute() {
    try {
      //TODO перенести бизнес-логику
      return await this.repository.getRoles();
    } catch (/** @type {ResponseException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
