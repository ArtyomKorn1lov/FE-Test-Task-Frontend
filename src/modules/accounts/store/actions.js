import Translations from "@/translations";
import {
  ResponseStatus,
  MessageTypes,
  DependencyInjection,
  TemplateHelper,
  MessageHelper,
  useFetch
} from "@/core";
import {AccountListWrapperClass} from "@/modules/accounts/constants";
import {
  AccountStore,
  Filter,
  Sort,
  FilterRole,
  Search,
  Pagination,
  Account,
  NextPage,
  SelectItem, AccountDelete
} from "@/modules/accounts/models";
import {
  GetFilterValues,
  GetPageNav,
  GetAccounts,
  DeleteAccount,
  DeleteAccounts
} from "@/modules/accounts/use-case";

const t = Translations.global.t;

/**
 * @type {GetFilterValues}
 */
const getFilterValues = DependencyInjection.resolve("GetFilterValues");
/**
 * @type {GetPageNav}
 */
const getPageNav = DependencyInjection.resolve("GetPageNav");
/**
 * @type {GetAccounts}
 */
const getAccounts = DependencyInjection.resolve("GetAccounts");
/**
 * @type {DeleteAccount}
 */
const deleteAccount = DependencyInjection.resolve('DeleteAccount');
/**
 * @type {DeleteAccounts}
 */
const deleteAccounts = DependencyInjection.resolve('DeleteAccounts');

/**
 * @type {(function(): Promise<Filter>)}
 */
const fetchFilterValues = useFetch({
  useCase: getFilterValues
});
/**
 * @type {(function(): Promise<Pagination>)}
 */
const fetchPageNav = useFetch({
  useCase: getPageNav
});
/**
 * @type {(function(filter: Filter, pagination: Pagination): Promise<Account[]>)}
 */
const fetchAccountList = useFetch({
  useCase: getAccounts
});
/**
 * @type {(function(id: Number): Promise<CommonResponse>)}
 */
const fetchDelete = useFetch({
  useCase: deleteAccount,
  messageType: MessageTypes.messageBox
});
/**
 * @type {(function(object: AccountDelete): Promise<CommonResponse>)}
 */
const fetchDeleteItems = useFetch({
  useCase: deleteAccounts,
  messageType: MessageTypes.messageBox
});

/**
 * @param {{ commit: VoidFunction }} params
 * @return {Promise<void>}
 */
export const initFilterValues = async ({commit}) => {
  try {
    commit('setFilterValues', await fetchFilterValues());
  } catch (e) {
  }
}

/**
 * @param {{ commit: VoidFunction }} params
 * @return {Promise<void>}
 */
export const initPagination = async ({commit}) => {
  try {
    commit('setPaginationValues', await fetchPageNav());
  } catch (e) {
  }
}

/**
 * @param {{ commit: VoidFunction, state: AccountStore }} params
 * @param {Number} itemsCount
 * @returns {void}
 */
const nextPage = ({commit, state}, itemsCount) => {
  if (!itemsCount || itemsCount < state.pagination.pageCount) {
    commit('setIsLoading', false);
    return;
  }
  commit("setIsLoading", true);
  commit('setPaginationValues', new NextPage({page: Number(state.pagination.page) + 1}));
}

/**
 * @param {{ commit: VoidFunction, state: AccountStore }} params
 * @return {Promise<void>}
 */
export const initAccountList = async ({commit, state}) => {
  try {
    commit("resetSelected");
    commit('setIsLoading', false);
    commit("setPaginationValues", new Pagination({
      page: 1,
      pageCount: state.pagination.pageCount
    }));
    const response = await fetchAccountList(state.filter, state.pagination);
    commit('setAccounts', response);
    const accountWrapper = TemplateHelper.getElementByClassName(AccountListWrapperClass);
    if (!!accountWrapper) {
      accountWrapper.scrollTop = 0;
    }
    nextPage({commit, state}, response.length);
  } catch (e) {
    nextPage({commit, state}, 1);
  }
}

/**
 * @param {{ commit: VoidFunction, state: AccountStore }} params
 * @return {Promise<void>}
 */
export const addAccountList = async ({commit, state}) => {
  try {
    const response = await fetchAccountList(state.filter, state.pagination);
    commit('addAccounts', response);
    nextPage({commit, state}, response.length);
  } catch (e) {
    nextPage({commit, state}, 1);
  }
}

/**
 * @param {{ commit: VoidFunction, state: AccountStore, dispatch: VoidFunction }} params
 * @param {Filter|Sort|FilterRole} payload
 * @returns {Promise<void>}
 */
export const onFilter = async ({commit, state, dispatch}, payload) => {
  try {
    commit("setFilterValues", payload);
    commit("setPaginationValues", new Pagination({
      page: 1,
      pageCount: state.pagination.pageCount
    }));
    await dispatch("initAccountList");
  } catch (e) {
    nextPage({commit, state}, 1);
  }
}

/**
 * @param {{ dispatch: VoidFunction }} params
 * @param {Number} payload
 * @returns {Promise<void>}
 */
export const onDeleteItem = async ({dispatch}, payload) => {
  try {
    await MessageHelper.showConfirmMessageBox({
      title: t('accountSection.deleteItem.questionTitle'),
      message: t('accountSection.deleteItem.questionDescription'),
      cancelMessage: t('modal.deleteItem.cancelBtnTitle'),
      callback: async () => {
        const response = await fetchDelete(payload);
        MessageHelper.showNotification({
          title: t('core.messages.successTitle'),
          message: response?.message,
          type: ResponseStatus.success,
        });
        await dispatch('initAccountList');
      },
    });
  } catch (e) {
  }
}

/**
 * @param {{ state: AccountStore, dispatch: VoidFunction }} params
 * @returns {Promise<void>}
 */
export const onDeleteSelectedItems = async ({state, dispatch}) => {
  try {
    await MessageHelper.showConfirmMessageBox({
      title: t('controls.deleteItems.questionTitle'),
      message: t('controls.deleteItems.questionDescription'),
      cancelMessage: t('modal.deleteItems.cancelBtnTitle'),
      callback: async () => {
        const response = await fetchDeleteItems(new AccountDelete({
          ids: state.selectedItems
        }));
        MessageHelper.showNotification({
          title: t('core.messages.successTitle'),
          message: response?.message,
          type: ResponseStatus.success,
        });
        await dispatch('initAccountList');
      },
    });
  } catch (e) {
  }
}

/**
 * @param {{ commit: VoidFunction, state: AccountStore }} params
 * @param {SelectItem} payload
 * @returns {void}
 */
export const onSelectItem = ({commit, state}, payload) => {
  commit("setSelectAll", false);
  let selectedItems = [...state.selectedItems];
  if (payload.value) {
    !selectedItems.includes(payload.id) && (selectedItems.push(payload.id));
  } else {
    selectedItems = selectedItems.filter((item) => item !== payload.id);
  }
  commit("setSelectedItems", selectedItems);
}

/**
 * @param {{ commit: VoidFunction, state: AccountStore }} params
 * @param {Boolean} payload
 * @returns {void}
 */
export const onSelectAll = ({commit, state}, payload) => {
  commit("setSelectAll", payload);
  if (payload) {
    const selectedItems = state.items.map((item) => item.id);
    commit("setSelectedItems", selectedItems);
    return;
  }
  commit("setSelectedItems", []);
}
