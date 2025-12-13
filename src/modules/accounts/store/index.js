import { createStore } from 'vuex';
import * as getters from '@/modules/accounts/store/getters';
import * as mutations from '@/modules/accounts/store/mutations';
import * as actions from '@/modules/accounts/store/actions';
import { AccountStore } from '@/modules/accounts/models';
import { DefaultFilterValues, DefaultPaginationValues } from '@/modules/accounts/constants';

/**
 * @type {AccountStore}
 */
const state = new AccountStore({
  modalToggle: false,
  modalCode: false,
  modalTitle: false,
  modalKey: false,
  accountEditId: null,
  filter: DefaultFilterValues,
  pagination: DefaultPaginationValues,
  selectedItems: [],
  isSelectAll: false,
  selectedRoleName: '',
  items: [],
  isLoading: true,
});

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
