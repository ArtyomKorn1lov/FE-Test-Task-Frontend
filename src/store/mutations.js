import StoreModel from "@/models/StoreModel";
import ModalModel from "@/models/ModalModel";
import FilterModel from "@/models/FilterModel";
import PaginationModel from "@/models/PaginationModel";

/**
 * @param {StoreModel} state
 * @param {ModalModel} payload
 */
export const setModalProps = (state, payload) => {
  state.modalToggle = payload.toggle;
  state.modalCode = payload.code;
  state.modalTitle = payload.title;
}

/**
 * @param {StoreModel} state
 * @param {FilterModel} payload
 */
export const setFilterValues = (state, payload) => {
  state.filter = {...state.filter, ...payload};
}

/**
 * @param {StoreModel} state
 * @param {PaginationModel} payload
 */
export const setPaginationValues = (state, payload) => {
  state.pagination = {...state.pagination, ...payload};
}
