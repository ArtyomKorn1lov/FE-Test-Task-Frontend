import StoreModel from "@/core/models/StoreModel.js";
import ModalModel from "@/core/models/ModalModel.js";
import FilterModel from "@/core/models/FilterModel.js";
import PaginationModel from "@/core/models/PaginationModel.js";

/**
 *
 * @param {StoreModel} state
 * @returns {ModalModel}
 */
export const getModalProps = state => {
  return new ModalModel({
    toggle: state.modalToggle,
    code: state.modalCode,
    title: state.modalTitle
  });
};

/**
 *
 * @param {StoreModel} state
 * @returns {FilterModel}
 */
export const getFilter = state => {
  return state.filter;
};

/**
 *
 * @param {StoreModel} state
 * @returns {PaginationModel}
 */
export const getPagination = state => {
  return state.pagination;
};


/**
 *
 * @param {StoreModel} state
 * @returns {Number|Boolean}
 */
export const getAccountEditId = state => {
  return state.accountEditId;
}
