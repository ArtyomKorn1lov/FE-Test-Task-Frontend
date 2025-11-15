import {ResponseException, CommonResponse, BaseUseCase} from "@/core";
import {AccountCreate} from "@/modules/accounts";
import {AccountRepository} from "@/modules/accounts/repositories";

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
   * @param {AccountCreate} object
   * @return {Promise<CommonResponse>}
   */
  async execute(object) {
    try {
      //TODO перенести бизнес-логику
      return await this.repository.create(object);
    } catch (/** @type {ResponseException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
