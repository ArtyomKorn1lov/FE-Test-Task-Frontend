<template>
  <Header
    @open-modal="openModal"
    @search="search"
  >
  </Header>
</template>
<script setup>
import { useStore } from 'vuex';
import Header from '@/components/header/Header.vue';
import ModalModel from '@/models/ModalModel';
import ContextSearchModel from '@/models/ContextSearchModel';
import NextPageModel from '@/models/NextPageModel';
import { OneCountElement } from '@/lib/constants';

const store = useStore();

/** @param {boolean} flag */
const openModal = (flag = false) => {
  store.commit('setModalProps', new ModalModel({
    toggle: flag,
    title: "Connect user",
    code: "Account"
  }));
}

/**
 * @param {String} value
 */
const search = (value) => {
  store.commit('setFilterValues', new ContextSearchModel({
    search: value
  }));
  store.commit('setPaginationValues', new NextPageModel({
    page: OneCountElement
  }));
}

</script>
