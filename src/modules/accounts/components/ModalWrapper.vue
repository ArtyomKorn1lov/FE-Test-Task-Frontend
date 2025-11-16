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
import {computed, ComputedRef, Component} from 'vue';
import {useStore, Store} from 'vuex';
import {ModalParams, CloseModalParams, Modal} from "@/modules/ui";
import {ModalComponentsCodes} from "@/modules/accounts/enums";
import {Filter, AccountStore} from "@/modules/accounts/models";
import ModalComponents from "@/modules/accounts/components/ModalComponents";

/**
 * @type {Store<AccountStore>}
 */
const store = useStore();

/**
 * @type {ComputedRef<ModalParams>}
 */
const modalProps = computed(() => store.getters.getModalProps);
/**
 * @type {ComputedRef<Component>}
 */
const selectedComponent = computed(() => {
  if (!ModalComponents[modalProps.value.code]) {
    return ModalComponents[ModalComponentsCodes.undefined];
  }
  return ModalComponents[modalProps.value.code];
});
/**
 * @type {ComputedRef<Filter>}
 */
const filter = computed(() => store.getters.getFilter);
/**
 * @type {ComputedRef<Number|Boolean>}
 */
const accountEditId = computed(() => store.getters.getAccountEditId);

/**
 * @param {CloseModalParams} objClose
 */
const closeModal = (objClose) => {
  store.commit('setModalProps', new ModalParams({
    toggle: objClose.toggle,
    title: modalProps.value.title,
    code: modalProps.value.code
  }));
}

// TODO нужно ли тут ещё делать обновление ещё вопрос
const update = () => {
  closeModal(new CloseModalParams({
    toggle: false
  }));
  store.commit('setFilterValues', new Filter({
    ...filter.value
  }));
}
</script>
