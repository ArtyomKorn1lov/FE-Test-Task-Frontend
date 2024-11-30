import StoreModel from "@/models/StoreModel";
import ModalModel from "@/models/ModalModel";

/**
 * @param {StoreModel} state
 * @param {ModalModel} payload
 */
export const setModalProps = (state, payload) => {
    state.modalToggle = payload.toggle;
    state.modalCode = payload.code;
    state.modalTitle = payload.title;
}
