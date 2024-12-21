<template>
  <div class="b-account__list custom-scroll overflow-y">
    <AccountCard
      v-for="item in items"
      :key="item.id"
      :element="item"
     />
  </div>
</template>
<script setup>
import AccountModel from '@/models/AccountModel';
import AccountCard from '@/components/account/AccountCard.vue';

const { items } = defineProps({
  items: {
    type: Array[AccountModel],
    default: []
  }
});

</script>
