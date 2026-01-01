<template>
  <div class="mainContainer">
    <Header />
    <slot />
    <ModalWrapper />
  </div>
</template>
<script setup>
import { Header, ModalWrapper } from '@/modules/accounts/components';
</script>
