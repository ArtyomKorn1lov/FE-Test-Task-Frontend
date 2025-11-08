<template>
  <div class="mainContainer">
    <HeaderWrapper />
    <RouterView />
    <ModalWrapper />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import HeaderWrapper from '@/modules/accounts/containers/HeaderWrapper.vue';
import ModalWrapper from '@/modules/accounts/containers/ModalWrapper.vue';
</script>
