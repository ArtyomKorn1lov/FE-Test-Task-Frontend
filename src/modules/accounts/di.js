import { DependencyInjection } from '@/core';
import { AccountRepository } from '@/modules/accounts/repositories';
import {
  CreateAccount,
  DeleteAccount,
  DeleteAccounts,
  GetAccountById,
  GetAccounts,
  GetFilterValues,
  GetPageNav,
  GetRoles,
  SearchAccounts,
  UpdateAccount,
} from '@/modules/accounts/use-case';

DependencyInjection.register('AccountRepository', AccountRepository, ['ApiClient']);

DependencyInjection.register('CreateAccount', CreateAccount, ['AccountRepository', 'ValidationProvider']);
DependencyInjection.register('DeleteAccount', DeleteAccount, ['AccountRepository', 'ValidationProvider']);
DependencyInjection.register('DeleteAccounts', DeleteAccounts, ['AccountRepository', 'ValidationProvider']);
DependencyInjection.register('GetAccountById', GetAccountById, ['AccountRepository']);
DependencyInjection.register('GetAccounts', GetAccounts, ['AccountRepository']);
DependencyInjection.register('GetFilterValues', GetFilterValues, ['AccountRepository', 'ValidationProvider']);
DependencyInjection.register('GetPageNav', GetPageNav, ['AccountRepository', 'ValidationProvider']);
DependencyInjection.register('GetRoles', GetRoles, ['AccountRepository']);
DependencyInjection.register('SearchAccounts', SearchAccounts, ['AccountRepository']);
DependencyInjection.register('UpdateAccount', UpdateAccount, ['AccountRepository', 'ValidationProvider']);
