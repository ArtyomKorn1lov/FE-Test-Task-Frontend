<template>
  <div class="mainContainer">
    <Header></Header>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';

import Header from '@/components/header/Header.vue';
</script>
