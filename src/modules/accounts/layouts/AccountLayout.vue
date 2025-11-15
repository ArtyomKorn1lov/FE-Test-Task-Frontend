<template>
  <div class="mainContainer">
    <HeaderWrapper />
    <slot />
  </div>
</template>
<script setup>
import HeaderWrapper from "@/modules/accounts/containers/HeaderWrapper.vue";
</script>
