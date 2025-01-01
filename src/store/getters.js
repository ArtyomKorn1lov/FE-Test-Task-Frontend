import StoreModel from "@/models/StoreModel";
import ModalModel from "@/models/ModalModel";
import FilterModel from "@/models/FilterModel";

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
