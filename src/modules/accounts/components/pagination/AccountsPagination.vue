<template>
  <el-skeleton
    class="b-skeleton observable"
    :rows="2"
    animated
  />
</template>
<script setup>
import { ElSkeleton } from 'element-plus';
import useObserverPagination from '@/core/composable/useObserverPagination.js';
import { ReloadPaginationEmit, PaginationSelector } from '@/core/lib/constants.js';

const emit = defineEmits([ReloadPaginationEmit]);

useObserverPagination(PaginationSelector, emit);
</script>
