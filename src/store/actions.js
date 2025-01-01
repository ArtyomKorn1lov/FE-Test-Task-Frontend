import { getFilter } from "@/api/accounts";
import FilterModel from "@/models/FilterModel";
import Converter from "@/lib/helpers/converter";
import { DefaultFilterValues } from "@/lib/constants";
import NextPageModel from "@/models/NextPageModel";

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
 * @param {Number} itemsCount
 * @returns {Boolean}
 */
export const nextPage = ({ commit, state }, itemsCount) => {
  if (!itemsCount || itemsCount < state.filter.pageCount) {
    return false;
  }

  commit('setFilterValues', new NextPageModel({page: Number(state.filter.page) + 1}));
  return true;
}
