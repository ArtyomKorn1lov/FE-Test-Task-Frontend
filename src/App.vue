<template>
  <div class="mainContainer">
    <HeaderWrapper />
    <RouterView />
    <ModalWrapper />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import HeaderWrapper from '@/containers/HeaderWrapper.vue';
import ModalWrapper from '@/containers/ModalWrapper.vue';
</script>
