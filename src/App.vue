<template>
  <div class="mainContainer">
    <HeaderWrapper />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';

import HeaderWrapper from '@/containers/HeaderWrapper.vue';
</script>
