import { getFilter, getPagination } from "@/core/api/accounts.js";
import FilterModel from "@/core/models/FilterModel.js";
import Converter from "@/core/lib/helpers/converter.js";
import { DefaultFilterValues, DefaultPaginationValues } from "@/core/lib/constants.js";
import NextPageModel from "@/core/models/NextPageModel.js";

/**
 * @param {*} param0
 */
export const initFilterValues = async ({ commit }) => {
  await getFilter()
    .then((response) => {
      /**
       * @type {FilterModel}
       */
      let filterObj = Converter.convertArrayToObject(response?.data);
      !filterObj && (filterObj = DefaultFilterValues);
      commit('setFilterValues', filterObj);
    })
    .catch((error) => {
      console.error('GET error:{accounts/filter}', error);
      commit('setFilterValues', DefaultFilterValues);
    });
}

/**
 * @param {*} param0
 */
export const initPagination = async ({ commit }) => {
  await getPagination()
    .then((response) => {
      let pageObj = Converter.convertArrayToObject(response?.data);
      !pageObj && (pageObj = DefaultPaginationValues);
      commit('setPaginationValues', pageObj);
    })
    .catch((error) => {
      console.error('GET error:{accounts/page-nav}', error);
      commit('setPaginationValues', DefaultPaginationValues);
    });
}

/**
 * @param {*} param0
 * @param {Number} itemsCount
 * @returns {Boolean}
 */
export const nextPage = ({ commit, state }, itemsCount) => {
  if (!itemsCount || itemsCount < state.pagination.pageCount) {
    return false;
  }

  commit('setPaginationValues', new NextPageModel({page: Number(state.pagination.page) + 1}));
  return true;
}
