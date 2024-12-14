import StoreModel from "@/models/StoreModel";
import ModalModel from "@/models/ModalModel";

/** @param {StoreModel} state */
export const getModalProps = state => {
  return new ModalModel({
    toggle: state.modalToggle,
    code: state.modalCode,
    title: state.modalTitle
  });
};
