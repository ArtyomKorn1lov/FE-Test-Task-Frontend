<template>
  <div class="b-account__list custom-scroll overflow-y">
    <AccountCard
      v-for="item in items"
      :key="item.id"
      :element="item"
     />
     <AccountsPagination
      v-if="isLoading"
      @refresh="refresh"
     />
  </div>
</template>
<script setup>
import AccountModel from '@/models/AccountModel';
import AccountCard from '@/components/account/AccountCard.vue';
import AccountsPagination from '@/components/pagination/AccountsPagination.vue';

const { items, isLoading } = defineProps({
  items: {
    type: Array[AccountModel],
    default: []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['refresh']);

const refresh = () => {
  emit('refresh');
}
</script>
