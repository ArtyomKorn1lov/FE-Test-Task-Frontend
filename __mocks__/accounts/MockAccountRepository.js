import Translations from '@/translations';
import { ArgumentException, ObjectHelper, CommonResponse } from '@/core';
import {
  OptionResponse,
  Role,
  Filter,
  ContextSearch,
  ContextSearchResponse,
  Account,
  AccountCreate,
  AccountDelete,
  AccountUpdate,
  Pagination,
} from '@/modules/accounts/models';
import { AccountRepository } from '@/modules/accounts/repositories';
import MockPageNav from './mock_page_nav';
import MockFilterData from './mock_filter_data';
import MockRoleList from './mock_role_list';
import MockContextSearch from './mock_context_search';
import MockAccountList from './mock_account_list';
import MockAccountData from './mock_account_data';
import MockAccountCreateResponse from './mock_account_create_response';
import MockAccountUpdateResponse from './mock_account_update_response';
import MockAccountDeleteResponse from './mock_account_delete_response';

const t = Translations.global.t;

/**
 * @final
 * @extends AccountRepository
 */
export default class MockAccountRepository {
  /**
   * @private
   * @type {Number}
   */
  delay;

  /**
   * @constructor
   * @param {Number} delay
   */
  constructor(delay = 100) {
    this.delay = delay;
  }

  /**
   * @override
   * @public
   * @return {Promise<OptionResponse[]>}
   */
  async getFilterValues() {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(MockFilterData);
      }, this.delay);
    });
  }

  /**
   * @override
   * @public
   * @return {Promise<OptionResponse[]>}
   */
  async getPageNav() {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(MockPageNav);
      }, this.delay);
    });
  }

  /**
   * @override
   * @public
   * @return {Promise<Role[]>}
   */
  async getRoles() {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(MockRoleList);
      }, this.delay);
    });
  }

  /**
   * @override
   * @public
   * @param {ContextSearch} contextSearch
   * @return {Promise<ContextSearchResponse[]>}
   * @throws {ArgumentException}
   */
  async search(contextSearch) {
    if (!ObjectHelper.isCompatibleWithClass(contextSearch, ContextSearch)) {
      throw new ArgumentException(t('accounts.mocks.errors.objectInstance', { className: ContextSearch }));
    }
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(MockContextSearch);
      }, this.delay);
    });
  }

  /**
   * @override
   * @public
   * @param {Filter} filter
   * @param {Pagination|null} pageNav
   * @return {Promise<Account[]>}
   */
  async getList(filter, pageNav = null) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(MockAccountList[pageNav.page] ?? []);
      }, this.delay);
    });
  }

  /**
   * @override
   * @public
   * @param {Number} id
   * @return {Promise<AccountUpdate>}
   * @throws {ArgumentException}
   */
  async getById(id) {
    if (!id) {
      throw new ArgumentException(t('accounts.mocks.errors.argument', { name: 'Id' }));
    }
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(MockAccountData);
      }, this.delay);
    });
  }

  /**
   * @override
   * @public
   * @param {AccountCreate} object
   * @return {Promise<CommonResponse>}
   * @throws {ArgumentException}
   */
  async create(object) {
    if (!ObjectHelper.isCompatibleWithClass(object, AccountCreate)) {
      throw new ArgumentException(t('accounts.mocks.errors.objectInstance', { className: AccountCreate }));
    }
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(new CommonResponse(MockAccountCreateResponse));
      }, this.delay);
    });
  }

  /**
   * @override
   * @public
   * @param {AccountUpdate} object
   * @return {Promise<CommonResponse>}
   * @throws {ArgumentException}
   */
  async update(object) {
    if (!ObjectHelper.isCompatibleWithClass(object, AccountUpdate)) {
      throw new ArgumentException(t('accounts.mocks.errors.objectInstance', { className: AccountUpdate }));
    }
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(new CommonResponse(MockAccountUpdateResponse));
      }, this.delay);
    });
  }

  /**
   * @override
   * @public
   * @param {Number} id
   * @return {Promise<CommonResponse>}
   * @throws {ArgumentException}
   */
  async delete(id) {
    if (!id) {
      throw new ArgumentException(t('accounts.mocks.errors.argument', { name: 'Id' }));
    }
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(new CommonResponse(MockAccountDeleteResponse));
      }, this.delay);
    });
  }

  /**
   * @override
   * @public
   * @param {AccountDelete} object
   * @return {Promise<CommonResponse>}
   * @throws {ArgumentException}
   */
  async deleteItems(object) {
    if (!ObjectHelper.isCompatibleWithClass(object, AccountDelete)) {
      throw new ArgumentException(t('accounts.mocks.errors.objectInstance', { className: AccountDelete }));
    }
    if (!object.ids || object.ids.length <= 0) {
      throw new ArgumentException(t('accounts.mocks.errors.argument', { name: 'Ids' }));
    }
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(new CommonResponse(MockAccountDeleteResponse));
      }, this.delay);
    });
  }
}
