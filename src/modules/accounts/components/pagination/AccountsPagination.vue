<template>
  <el-skeleton
    class="b-skeleton observable"
    :rows="2"
    animated
  />
</template>
<script setup>
import { ElSkeleton } from 'element-plus';
import usePagination from '@/core/composable/pagination.js';
import { ReloadPaginationEmit, PaginationSelector } from '@/core/lib/constants.js';

const emit = defineEmits([ReloadPaginationEmit]);

usePagination(PaginationSelector, emit);
</script>
