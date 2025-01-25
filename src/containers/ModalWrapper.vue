<template>
  <Modal
    :title="modalProps.title"
    :toggle="modalProps.toggle"
    @close="closeModal"
  >
    <component
      :is="selectedComponent"
      :account-edit-id="accountEditId"
      @update="update"
    />
  </Modal>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Modal from '@/components/modal/Modal.vue';
import ModalModel, { CloseModalModel } from '@/models/ModalModel';
import ModalComponents, { ComponentNotExist } from '@/models/ModalComponents';
import FilterModel from '@/models/FilterModel';
import ResetModalComponentModel from '@/models/ResetModalComponentModel';

const store = useStore();

/** @type {ModalModel} */
const modalProps = computed(() => store.getters.getModalProps);
/** @type {component} */
const selectedComponent = computed(() => {
  if (!ModalComponents[modalProps.value.code]) {
    return ComponentNotExist;
  }
  return ModalComponents[modalProps.value.code];
});
const filter = computed(() => store.getters.getFilter);
const accountEditId = computed(() => store.getters.getAccountEditId);

/**
 * @param {CloseModalModel} objClose
 */
const closeModal = (objClose) => {
  store.commit('setModalProps', new ModalModel({
    toggle: objClose.toggle,
    title: modalProps.value.title,
    code: modalProps.value.code
  }));
  // Сброс компонента в модальном окне, после закрытия модалки
  setTimeout(() => {
    store.commit('resetModalComponent', new ResetModalComponentModel({
      modalCode: false
    }));
  }, 100);
}

const update = () => {
  closeModal(new CloseModalModel({
      toggle: false
    }));
  store.commit('setFilterValues', new FilterModel({
    ...filter.value
  }));
}

</script>
