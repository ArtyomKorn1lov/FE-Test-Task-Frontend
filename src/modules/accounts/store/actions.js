import {DependencyInjection, useFetch} from "@/core";
import {
  AccountStore,
  Filter,
  Sort,
  Search,
  Pagination,
  Account,
  NextPage
} from "@/modules/accounts/models";
import {
  GetFilterValues,
  GetPageNav,
  GetAccounts
} from "@/modules/accounts/use-case";

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
  commit('setPaginationValues', new NextPage({page: Number(state.pagination.page) + 1}));
}

/**
 * @param {{ commit: VoidFunction, state: AccountStore }} params
 * @return {Promise<void>}
 */
export const initAccountList = async ({commit, state}) => {
  try {
    const response = await fetchAccountList(state.filter, state.pagination);
    nextPage({commit, state}, response.length);
    commit('setAccounts', response);
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
    nextPage({commit, state}, response.length);
    commit('addAccounts', response);
  } catch (e) {
    nextPage({commit, state}, 1);
  }
}

/**
 * @param {{ commit: VoidFunction, state: AccountStore, dispatch: VoidFunction }} params
 * @param {Filter|Sort} filter
 * @returns {Promise<void>}
 */
export const onFilter = async ({commit, state, dispatch}, filter) => {
  try {
    commit("setFilterValues", filter);
    commit("setPaginationValues", new Pagination({
      page: 1,
      pageCount: state.pagination.pageCount
    }));
    await dispatch("initAccountList");
  } catch (e) {
    nextPage({commit, state}, 1);
  }
}
