<template>
  <Modal
    :title="modalProps.title"
    :toggle="modalProps.toggle"
    @close="closeModal"
  >
    <p>test content</p>
  </Modal>
</template>
<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import Modal from '@/components/modal/Modal.vue';
import ModalModel, { CloseModalModel } from '@/models/ModalModel';

const store = useStore();

/** @type {ModalModel} */
const modalProps = computed(() => store.getters.getModalProps);

console.log('modalProps', modalProps.value);
watch(modalProps, (newValue) => {
  console.log('newValue', newValue);
});

/** @param {CloseModalModel} objClose */
const closeModal = (objClose) => {
  store.commit('setModalProps', new ModalModel({
    toggle: objClose.toggle,
    title: false,
    code: false
  }));
}

</script>
