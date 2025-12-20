import { ModalParams } from '@/modules/ui';
import { AccountStore, Filter, Pagination, Account } from '@/modules/accounts/models';

/**
 * @param {AccountStore} state
 * @returns {ModalParams}
 */
export const getModalProps = (state) => {
  return new ModalParams({
    toggle: state.modalToggle,
    code: state.modalCode,
    title: state.modalTitle,
  });
};

/**
 * @param {AccountStore} state
 * @return {Boolean}
 */
export const getModalKey = (state) => {
  return state.modalKey;
};

/**
 * @param {AccountStore} state
 * @returns {Filter}
 */
export const getFilter = (state) => {
  return state.filter;
};

/**
 * @param {AccountStore} state
 * @returns {Pagination}
 */
export const getPagination = (state) => {
  return state.pagination;
};

/**
 * @param {AccountStore} state
 * @returns {Number|Boolean}
 */
export const getAccountEditId = (state) => {
  return state.accountEditId;
};

/**
 * @param {AccountStore} state
 * @returns {Account[]}
 */
export const getItems = (state) => {
  return state.items;
};

/**
 * @param {AccountStore} state
 * @returns {Boolean}
 */
export const getIsLoading = (state) => {
  return state.isLoading;
};

/**
 * @param {AccountStore} state
 * @return {Number[]}
 */
export const getSelectedItems = (state) => {
  return state.selectedItems;
};

/**
 * @param {AccountStore} state
 * @return {Boolean}
 */
export const getIsSelectAll = (state) => {
  return state.isSelectAll;
};

/**
 * @param {AccountStore} state
 * @return {String}
 */
export const getSelectedRoleName = (state) => {
  return state.selectedRoleName;
};
