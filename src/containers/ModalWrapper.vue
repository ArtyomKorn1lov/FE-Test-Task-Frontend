<template>
  <Modal
    :title="modalProps.title"
    :toggle="modalProps.toggle"
    @close="closeModal"
  >
    <component
      :is="selectedComponent"
      @update="update"
      ></component>
  </Modal>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Modal from '@/components/modal/Modal.vue';
import ModalModel, { CloseModalModel } from '@/models/ModalModel';
import FilterModel from '@/models/FilterModel';
import ModalComponents, { ComponentNotExist } from '@/models/ModalComponents';

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

/**
 * @param {CloseModalModel} objClose
 */
const closeModal = (objClose) => {
  store.commit('setModalProps', new ModalModel({
    toggle: objClose.toggle,
    title: false,
    code: false
  }));
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
