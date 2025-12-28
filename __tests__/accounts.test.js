/**
 * @fileOverview
 * @description Unit-тесты для модуля `accounts`
 */

import Translations from '@/translations';
import {
  MockPageNav,
  MockFilterData,
  MockRoleList,
  MockContextSearch,
  MockAccountList,
  MockAccountData,
  MockAccountCreateResponse,
  MockAccountUpdateResponse,
  MockAccountDeleteResponse,
  MockPageNavResult,
  MockFilterResult,
  MockAccountRepository,
} from '../__mocks__/accounts';
import { SortTypes, DependencyInjection, ArgumentException, ValidationProvider, ValidationException, CommonResponse } from '@/core';
import { Filter, ContextSearch, AccountCreate, AccountDelete, AccountUpdate, Pagination } from '@/modules/accounts/models';
import {
  GetFilterValues,
  GetPageNav,
  GetRoles,
  SearchAccounts,
  GetAccounts,
  GetAccountById,
  CreateAccount,
  UpdateAccount,
  DeleteAccount,
  DeleteAccounts,
} from '@/modules/accounts/use-case';

const t = Translations.global.t;

describe('accounts', () => {
  DependencyInjection.register('MockAccountRepository', MockAccountRepository, [], [20]);
  DependencyInjection.register('ValidationProvider', ValidationProvider);
  DependencyInjection.register('GetFilterValues', GetFilterValues, ['MockAccountRepository', 'ValidationProvider']);
  DependencyInjection.register('GetPageNav', GetPageNav, ['MockAccountRepository', 'ValidationProvider']);
  DependencyInjection.register('GetRoles', GetRoles, ['MockAccountRepository']);
  DependencyInjection.register('SearchAccounts', SearchAccounts, ['MockAccountRepository']);
  DependencyInjection.register('GetAccounts', GetAccounts, ['MockAccountRepository']);
  DependencyInjection.register('GetAccountById', GetAccountById, ['MockAccountRepository']);
  DependencyInjection.register('CreateAccount', CreateAccount, ['MockAccountRepository', 'ValidationProvider']);
  DependencyInjection.register('UpdateAccount', UpdateAccount, ['MockAccountRepository', 'ValidationProvider']);
  DependencyInjection.register('DeleteAccount', DeleteAccount, ['MockAccountRepository', 'ValidationProvider']);
  DependencyInjection.register('DeleteAccounts', DeleteAccounts, ['MockAccountRepository', 'ValidationProvider']);
  /**
   * @type {GetPageNav}
   */
  const getPageNav = DependencyInjection.resolve('GetPageNav');
  /**
   * @type {GetFilterValues}
   */
  const getFilterValues = DependencyInjection.resolve('GetFilterValues');
  /**
   * @type {GetRoles}
   */
  const getRoles = DependencyInjection.resolve('GetRoles');
  /**
   * @type {SearchAccounts}
   */
  const searchAccounts = DependencyInjection.resolve('SearchAccounts');
  /**
   * @type {GetAccounts}
   */
  const getAccounts = DependencyInjection.resolve('GetAccounts');
  /**
   * @type {GetAccountById}
   */
  const getAccountById = DependencyInjection.resolve('GetAccountById');
  /**
   * @type {CreateAccount}
   */
  const createAccounts = DependencyInjection.resolve('CreateAccount');
  /**
   * @type {UpdateAccount}
   */
  const updateAccount = DependencyInjection.resolve('UpdateAccount');
  /**
   * @type {DeleteAccount}
   */
  const deleteAccount = DependencyInjection.resolve('DeleteAccount');
  /**
   * @type {DeleteAccounts}
   */
  const deleteAccounts = DependencyInjection.resolve('DeleteAccounts');

  test('should get page nav', async () => {
    await expect(getPageNav.execute()).resolves.toEqual(MockPageNavResult);
  });

  test('should get filter values', async () => {
    await expect(getFilterValues.execute()).resolves.toEqual(MockFilterResult);
  });

  test('should get roles', async () => {
    await expect(getRoles.execute()).resolves.toEqual(MockRoleList);
  });

  test('should search accounts', async () => {
    await expect(
      searchAccounts.execute(
        new ContextSearch({
          search: '',
          roleCode: '',
        }),
      ),
    ).resolves.toEqual(MockContextSearch);
  });

  test('should search accounts invalid class exception', async () => {
    await expect(
      searchAccounts.execute({
        search: '',
        roleCode: '',
      }),
    ).rejects.toThrow(ArgumentException);
  });

  test('should search accounts invalid class exception message', async () => {
    await expect(
      searchAccounts.execute({
        search: '',
        roleCode: '',
      }),
    ).rejects.toThrow(t('accounts.mocks.errors.objectInstance', { className: ContextSearch }));
  });

  test('should get accounts by page 1', async () => {
    await expect(
      getAccounts.execute(
        new Filter({
          sort: 'sort',
          order: SortTypes.asc,
          search: '',
          roleCode: '',
        }),
        new Pagination({
          page: 1,
          pageCount: 10,
        }),
      ),
    ).resolves.toEqual(MockAccountList[1]);
  });

  test('should get accounts by page 2', async () => {
    await expect(
      getAccounts.execute(
        new Filter({
          sort: 'id',
          order: SortTypes.desc,
          search: 'test',
          roleCode: 'admin',
        }),
        new Pagination({
          page: 2,
          pageCount: 10,
        }),
      ),
    ).resolves.toEqual(MockAccountList[2]);
  });

  test('should get account by id', async () => {
    await expect(getAccountById.execute(1)).resolves.toEqual(MockAccountData);
  });

  test('should get account by id exception', async () => {
    await expect(getAccountById.execute(null)).rejects.toThrow(ArgumentException);
  });

  test('should create account', async () => {
    await expect(
      createAccounts.execute(
        new AccountCreate({
          login: 'test',
          email: 'test@sunrize.com',
          picture: null,
          role: 'agent',
        }),
      ),
    ).resolves.toEqual(new CommonResponse(MockAccountCreateResponse));
  });

  test('should create account invalid class exception', async () => {
    await expect(
      createAccounts.execute({
        login: 'test',
        email: 'test@sunrize.com',
        picture: null,
        role: 'agent',
      }),
    ).rejects.toThrow(ArgumentException);
  });

  test('should create account invalid class exception message', async () => {
    await expect(
      createAccounts.execute({
        login: 'test',
        email: 'test@sunrize.com',
      }),
    ).rejects.toThrow(t('core.services.undefinedValueError', { code: 'role' }));
  });

  test('should create account exception', async () => {
    await expect(createAccounts.execute(new AccountCreate())).rejects.toThrow(ValidationException);
  });

  test('should create account exception message required field', async () => {
    await expect(
      createAccounts.execute(
        new AccountCreate({
          login: '',
          email: '',
          picture: null,
          role: '',
        }),
      ),
    ).rejects.toThrow(t('core.services.emptyValueErrorMessage', { code: 'login' }));
  });

  test('should create account exception message invalid email', async () => {
    await expect(
      createAccounts.execute(
        new AccountCreate({
          login: 'test',
          email: 'test',
          picture: null,
          role: 'admin',
        }),
      ),
    ).rejects.toThrow(t('core.services.invalidEmailErrorMessage', { code: 'email' }));
  });

  test('should update account', async () => {
    await expect(
      updateAccount.execute(
        new AccountUpdate({
          id: 10,
          login: 'test',
          email: 'test@sunrize.com',
          picture: null,
          role: 'admin',
        }),
      ),
    ).resolves.toEqual(new CommonResponse(MockAccountUpdateResponse));
  });

  test('should update account invalid class exception', async () => {
    await expect(
      updateAccount.execute({
        id: 10,
        login: 'test',
        email: 'test@sunrize.com',
        picture: null,
        role: 'admin',
      }),
    ).rejects.toThrow(ArgumentException);
  });

  test('should update account invalid class exception message', async () => {
    await expect(
      updateAccount.execute({
        id: 10,
        login: 'test',
      }),
    ).rejects.toThrow(t('core.services.undefinedValueError', { code: 'email' }));
  });

  test('should update account exception', async () => {
    await expect(updateAccount.execute(new AccountUpdate())).rejects.toThrow(ValidationException);
  });

  test('should update account exception message required field', async () => {
    await expect(
      updateAccount.execute(
        new AccountUpdate({
          id: null,
          login: '',
          email: '',
          picture: null,
          role: '',
        }),
      ),
    ).rejects.toThrow(t('core.services.emptyValueErrorMessage', { code: 'id' }));
  });

  test('should update account exception message invalid email', async () => {
    await expect(
      updateAccount.execute(
        new AccountUpdate({
          id: 10,
          login: 'test',
          email: 'test',
          picture: null,
          role: 'admin',
        }),
      ),
    ).rejects.toThrow(t('core.services.invalidEmailErrorMessage', { code: 'email' }));
  });

  test('should delete account', async () => {
    await expect(deleteAccount.execute(10)).resolves.toEqual(MockAccountDeleteResponse);
  });

  test('should delete account exception', async () => {
    await expect(deleteAccount.execute(null)).rejects.toThrow(ValidationException);
  });

  test('should delete account exception message', async () => {
    await expect(deleteAccount.execute(null)).rejects.toThrow(t('core.services.emptyValueErrorMessage', { code: 'id' }));
  });

  test('should delete accounts', async () => {
    await expect(
      deleteAccounts.execute(
        new AccountDelete({
          ids: [10],
        }),
      ),
    ).resolves.toEqual(new CommonResponse(MockAccountDeleteResponse));
  });

  test('should delete accounts exception', async () => {
    await expect(deleteAccounts.execute(new AccountDelete())).rejects.toThrow(ValidationException);
  });

  test('should delete accounts exception message', async () => {
    await expect(
      deleteAccounts.execute(
        new AccountDelete({
          ids: [],
        }),
      ),
    ).rejects.toThrow(t('core.services.emptyValueErrorMessage', { code: 'ids' }));
  });
});
