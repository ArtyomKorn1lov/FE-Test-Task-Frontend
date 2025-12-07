import {ResponseException, CommonResponse, BaseUseCase} from "@/core";
import {AccountUpdate} from "@/modules/accounts/models";
import {AccountRepository} from "@/modules/accounts/repositories";

/**
 * @final
 * @extends BaseUseCase
 */
export default class UpdateAccount extends BaseUseCase {
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
   * @param {AccountUpdate} object
   * @return {Promise<CommonResponse>}
   */
  async execute(object) {
    try {
      //TODO перенести бизнес-логику
      return await this.repository.update(object);
    } catch (/** @type {ResponseException} */ error) {
      console.error(error);
      throw error;
    }
  }
}
