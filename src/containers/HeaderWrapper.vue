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
import useTranslation from '@/composable/translations';
import Header from '@/components/header/Header.vue';
import ModalModel from '@/models/ModalModel';
import SearchModel from '@/models/SearchModel';
import { AccountFormComponentModalCode } from '@/lib/constants';

const loc = useTranslation('modal');

const store = useStore();

/**
 * @type {FilterModel}
 */
 const filter = computed(() => store.getters.getFilter);

/** @param {boolean} flag */
const openModal = (flag = false) => {
  store.commit('setModalProps', new ModalModel({
    toggle: flag,
    title: loc.value.account.titleCreate,
    code: AccountFormComponentModalCode
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
