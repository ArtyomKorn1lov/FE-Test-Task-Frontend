/**
 * @fileOverview
 * @description Unit-тесты для ядра приложения
 */

import { TestObject, TestModel, NextDependenceTestService, DependenceTestService, TestService } from '../__mocks__/core';
import Translations from '@/translations';
import { NotFoundException, DependencyInjection } from '@/core';

const t = Translations.global.t;

/** @description Тесты для DI */
describe('core.di', () => {
  /**
   * @type {TestService}
   */
  let testService;
  /**
   * @type {DependenceTestService}
   */
  let dependenceTestService;
  /**
   * @type {NextDependenceTestService}
   */
  let nextDependenceTestService;

  DependencyInjection.register('NextDependenceTestService', NextDependenceTestService, [], [1]);
  DependencyInjection.register(
    'DependenceTestService',
    DependenceTestService,
    ['NextDependenceTestService'],
    [
      true,
      new TestModel({
        count: 15,
        object: new TestObject({
          value: 1,
          label: 'counter',
        }),
      }),
    ],
  );
  DependencyInjection.register(
    'TestService',
    TestService,
    ['DependenceTestService', 'NextDependenceTestService'],
    [
      false,
      3,
      new TestObject({
        value: 2,
        label: 'counter',
      }),
    ],
  );

  test('should check availability TestService', () => {
    expect(() => {
      testService = DependencyInjection.resolve('TestService');
    }).not.toThrow();
  });

  test('should check availability DependenceTestService', () => {
    expect(() => {
      dependenceTestService = DependencyInjection.resolve('DependenceTestService');
    }).not.toThrow();
  });

  test('should check availability NextDependenceTestService', () => {
    expect(() => {
      nextDependenceTestService = DependencyInjection.resolve('NextDependenceTestService');
    }).not.toThrow();
  });

  test('should check dependencies in TestService', () => {
    const firstService = testService.getFirstService();
    const secondService = testService.getSecondService();
    const object = testService.getObject();
    expect(firstService).not.toBeUndefined();
    expect(secondService).not.toBeUndefined();
    expect(testService.getFlag()).not.toBeUndefined();
    expect(testService.getCounter()).not.toBeUndefined();
    expect(object).not.toBeUndefined();
    expect(firstService.getService()).not.toBeUndefined();
    expect(firstService.getFlag()).not.toBeUndefined();
    const model = firstService.getModel();
    expect(model).not.toBeUndefined();
    expect(secondService.getCounter()).not.toBeUndefined();
    expect(secondService.getCounter()).not.toBeUndefined();
    expect(object.value).not.toBeUndefined();
    expect(object.label).not.toBeUndefined();
    expect(model.count).not.toBeUndefined();
    expect(model.object).not.toBeUndefined();
    expect(model.object.value).not.toBeUndefined();
    expect(model.object.label).not.toBeUndefined();
  });

  test('should check dependencies in DependenceTestService', () => {
    const service = dependenceTestService.getService();
    const model = dependenceTestService.getModel();
    expect(service).not.toBeUndefined();
    expect(dependenceTestService.getFlag()).not.toBeUndefined();
    expect(model).not.toBeUndefined();
    expect(service.getCounter()).not.toBeUndefined();
    expect(model.count).not.toBeUndefined();
    expect(model.object).not.toBeUndefined();
  });

  test('should check dependencies in NextDependenceTestService', () => {
    expect(nextDependenceTestService.getCounter()).not.toBeUndefined();
  });

  test('should check di to NotFoundException', () => {
    expect(() => {
      DependencyInjection.resolve('Test');
    }).toThrow(NotFoundException);
  });

  test('should check di to NotFoundException message', () => {
    expect(() => {
      DependencyInjection.resolve('Test');
    }).toThrow(t('core.injection.notFound', { name: 'Test' }));
  });
});
