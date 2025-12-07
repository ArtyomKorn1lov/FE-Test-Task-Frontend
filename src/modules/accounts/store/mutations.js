import {ModalAnimationDelay, ModalParams} from "@/modules/ui";
import {AccountStore, Filter, Pagination, Account} from "@/modules/accounts/models";

/**
 * @description Управление флагом инициализации компонента внутри модального окна
 * @param {AccountStore} state
 */
const toggleModalKey = (state) => {
  if (!!state.modalKey) {
    setTimeout(() => {
      state.modalKey = false;
    }, ModalAnimationDelay);
  } else {
    state.modalKey = true;
  }
}

/**
 * @param {AccountStore} state
 * @param {ModalParams} payload
 */
export const setModalProps = (state, payload) => {
  state.modalToggle = payload.toggle;
  state.modalCode = payload.code;
  state.modalTitle = payload.title;
  state.accountEditId = !!payload.accountEditId ? payload.accountEditId : false;
  toggleModalKey(state);
}

/**
 * @param {AccountStore} state
 * @param {Boolean} payload
 */
export const setModalToggle = (state, payload) => {
  state.modalToggle = payload;
  toggleModalKey(state);
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

/**
 * @param {AccountStore} state
 * @param {Boolean} payload
 */
export const setSelectAll = (state, payload) => {
  state.isSelectAll = payload;
}

/**
 * @param {AccountStore} state
 * @param {Number[]} payload
 */
export const setSelectedItems = (state, payload) => {
  state.selectedItems = [...payload];
}

/**
 * @param {AccountStore} state
 * @param {String} payload
 */
export const setSelectedRole = (state, payload) => {
  state.selectedRoleName = payload;
}

/**
 * @param {AccountStore} state
 */
export const resetSelected = (state) => {
  state.isSelectAll = false;
  state.selectedItems = [];
}
