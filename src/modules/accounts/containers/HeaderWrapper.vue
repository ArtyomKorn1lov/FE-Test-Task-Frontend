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
import useTranslation from '@/core/composable/useTranslation.js';
import Header from '@/modules/accounts/components/header/Header.vue';
import ModalModel from '@/core/models/ModalModel.js';
import SearchModel from '@/core/models/SearchModel.js';
import { AccountFormComponentModalCode } from '@/core/lib/constants.js';

const loc = useTranslation('modal');

const store = useStore();

/**
 * @type {Filter}
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
