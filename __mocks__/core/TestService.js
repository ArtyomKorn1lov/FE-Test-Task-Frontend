import NextDependenceTestService from './NextDependenceTestService';
import DependenceTestService from './DependenceTestService';
import TestObject from './TestObject';

export default class TestService {
  /**
   * @private
   * @type {DependenceTestService}
   */
  firstService;
  /**
   * @private
   * @type {NextDependenceTestService}
   */
  secondService;
  /**
   * @private
   * @type {Boolean}
   */
  flag;
  /**
   * @private
   * @type {Number}
   */
  counter;
  /**
   * @private
   * @type {TestObject}
   */
  object;

  /**
   * @constructor
   * @param {DependenceTestService} firstService
   * @param {NextDependenceTestService} secondService
   * @param {Boolean} flag
   * @param {Number} counter
   * @param {TestObject} object
   */
  constructor(firstService, secondService, flag, counter, object) {
    this.firstService = firstService;
    this.secondService = secondService;
    this.flag = flag;
    this.counter = counter;
    this.object = object;
  }

  /**
   * @public
   * @return {DependenceTestService}
   */
  getFirstService() {
    return this.firstService;
  }

  /**
   * @public
   * @return {NextDependenceTestService}
   */
  getSecondService() {
    return this.secondService;
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
   * @return {Number}
   */
  getCounter() {
    return this.counter;
  }

  /**
   * @public
   * @return {TestObject}
   */
  getObject() {
    return this.object;
  }
}
