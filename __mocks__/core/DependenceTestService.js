import NextDependenceTestService from './NextDependenceTestService';
import TestModel from './TestModel';

export default class DependenceTestService {
  /**
   * @private
   * @type {NextDependenceTestService}
   */
  service;
  /**
   * @private
   * @type {Boolean}
   */
  flag;
  /**
   * @private
   * @type {TestModel}
   */
  model;

  /**
   * @constructor
   * @param {NextDependenceTestService} service
   * @param {Boolean} flag
   * @param {TestModel} model
   */
  constructor(service, flag, model) {
    this.service = service;
    this.flag = flag;
    this.model = model;
  }

  /**
   * @public
   * @return {NextDependenceTestService}
   */
  getService() {
    return this.service;
  }

  /**
   * @public
   * @return {Boolean}
   */
  getFlag() {
    return this.flag;
  }

  /**
   * @public
   * @return {TestModel}
   */
  getModel() {
    return this.model;
  }
}
