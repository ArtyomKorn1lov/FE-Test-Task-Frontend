<template>
  <el-skeleton
    class="b-skeleton"
    :class="PaginationSelectorCode"
    :rows="2"
    animated
  />
</template>
<script setup>
import { ElSkeleton } from 'element-plus';
import { useObserverPagination } from '@/modules/ui/composable';
import { ReloadPaginationEmit, PaginationSelectorCode } from '@/modules/ui';

const emit = defineEmits([ReloadPaginationEmit]);

useObserverPagination(PaginationSelectorCode, emit);
</script>
