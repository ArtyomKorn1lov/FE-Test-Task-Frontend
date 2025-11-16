import {ModalParams} from "@/modules/ui";
import {AccountStore, Filter, Pagination, Account} from "@/modules/accounts";

/**
 * @param {AccountStore} state
 * @param {ModalParams} payload
 */
export const setModalProps = (state, payload) => {
  state.modalToggle = payload.toggle;
  state.modalCode = payload.code;
  state.modalTitle = payload.title;
  state.accountEditId = !!payload.accountEditId ? payload.accountEditId : false;
}

/**
 * @param {AccountStore} state
 */
export const resetModalComponent = (state) => {
  state.modalCode = false;
}

/**
 * @param {AccountStore} state
 * @param {Filter} payload
 */
export const setFilterValues = (state, payload) => {
  state.filter = {...state.filter, ...payload};
}

/**
 * @param {AccountStore} state
 * @param {Pagination} payload
 */
export const setPaginationValues = (state, payload) => {
  state.pagination = {...state.pagination, ...payload};
}

/**
 * @param {AccountStore} state
 * @param {Account[]} payload
 */
export const setAccounts = (state, payload) => {
  state.items = [...payload];
}

/**
 * @param {AccountStore} state
 * @param {Account[]} payload
 */
export const addAccounts = (state, payload) => {
  state.items = [...state.items, ...payload];
}

/**
 * @param {AccountStore} state
 * @param {Boolean} payload
 */
export const setIsLoading = (state, payload) => {
  state.isLoading = payload;
}
