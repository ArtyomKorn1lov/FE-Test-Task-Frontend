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
import Modal from '@/modules/accounts/components/modal/Modal.vue';
import ModalModel, { CloseModalModel } from '@/core/models/ModalModel.js';
import ModalComponents, { ComponentNotExist } from '@/core/models/ModalComponents.js';
import FilterModel from '@/core/models/FilterModel.js';
import ResetModalComponentModel from '@/core/models/ResetModalComponentModel.js';

const store = useStore();

/**
 * @type {ModalModel}
 */
const modalProps = computed(() => store.getters.getModalProps);
/**
 * @type {component}
 */
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
