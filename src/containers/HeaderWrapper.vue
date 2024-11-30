<template>
  <Header
    @open-modal="openModal"
  >
  </Header>
</template>
<script setup>
import { useStore } from 'vuex';
import Header from '@/components/header/Header.vue';
import ModalModel from '@/models/ModalModel';

const store = useStore();

/** @param {boolean} flag */
const openModal = (flag = false) => {
  store.commit('setModalProps', new ModalModel({
    toggle: flag,
    title: "Add user",
    code: "user-create"
  }));
}
</script>
