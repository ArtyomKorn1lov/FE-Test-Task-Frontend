<template>
  <Modal
    :title="modalProps.title"
    :toggle="modalProps.toggle"
    @close="closeModal"
  >
    <component
      v-if="!!modalKey"
      :key="modalKey"
      :is="selectedComponent"
      :account-edit-id="accountEditId"
      @update="update"
    />
  </Modal>
</template>
<script setup>
import {computed, ref} from 'vue';
import {useStore, Store} from 'vuex';
import {ModalParams, Modal} from "@/modules/ui";
import {ModalComponentsCodes} from "@/modules/accounts/enums";
import {AccountStore} from "@/modules/accounts/models";
import ModalComponents from "@/modules/accounts/components/ModalComponents";

/**
 * @type {Store<AccountStore>}
 */
const store = useStore();

/**
 * @type {import('vue').ComputedRef<ModalParams>}
 */
const modalProps = computed(() => store.getters.getModalProps);
/**
 * @type {import('vue').ComputedRef<Component>}
 */
const selectedComponent = computed(() => {
  if (!ModalComponents[modalProps.value.code]) {
    return ModalComponents[ModalComponentsCodes.undefined];
  }
  return ModalComponents[modalProps.value.code];
});
/**
 * @type {import('vue').ComputedRef<Number|Boolean>}
 */
const accountEditId = computed(() => store.getters.getAccountEditId);
/**
 * @type {import('vue').ComputedRef<Boolean>}
 */
const modalKey = computed(() => store.getters.getModalKey);

const closeModal = () => {
  store.commit('setModalToggle', false);
}

/**
 * @return {Promise<void>}
 */
const update = async () => {
  closeModal();
  await store.dispatch('initAccountList');
}
</script>
