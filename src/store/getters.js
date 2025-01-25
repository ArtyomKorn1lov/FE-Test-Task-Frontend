import StoreModel from "@/models/StoreModel";
import ModalModel from "@/models/ModalModel";
import FilterModel from "@/models/FilterModel";
import PaginationModel from "@/models/PaginationModel";

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
