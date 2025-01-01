<template>
  <div class="b-account__list custom-scroll overflow-y">
    <AccountCard
      v-for="item in items"
      :key="item.id"
      :element="item"
      :is-selected="isSelectedItem(item.id)"
      @select-item="selectItem"
      @select-role="selectRole"
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
import SelectItemModel from '@/models/SelectItemModel';

const { items, selectedItems, isLoading } = defineProps({
  items: {
    type: Array[AccountModel],
    default: []
  },
  selectedItems: {
    type: Array[Number],
    default: []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['refresh', 'select-item', 'select-role']);

const refresh = () => {
  emit('refresh');
}

/**
 * @param {SelectItemModel} obj
 */
const selectItem = (obj) => {
  emit('select-item', obj);
}

/**
 * @param {Number} id
 */
const isSelectedItem = (id) => {
  return selectedItems.includes(id);
}

const selectRole = (obj) => {
  emit('select-role', obj);
}

</script>
