<template>
  <Header
    :role-code="filter.roleCode"
    @open-modal="openModal"
    @search="search"
  >
  </Header>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/header/Header.vue';
import ModalModel from '@/models/ModalModel';
import SearchModel from '@/models/SearchModel';

const store = useStore();

/**
 * @type {FilterModel}
 */
 const filter = computed(() => store.getters.getFilter);

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
  store.commit('setFilterValues', new SearchModel({
    search: value
  }));
}

</script>
