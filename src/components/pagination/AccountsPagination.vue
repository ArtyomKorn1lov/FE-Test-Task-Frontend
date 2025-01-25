<template>
  <el-skeleton
    class="b-skeleton observable"
    :rows="2"
    animated
  />
</template>
<script setup>
import { ElSkeleton } from 'element-plus';
import usePagination from '@/composable/pagination';
import { ReloadPaginationEmit, PaginationSelector } from '@/lib/constants';

const emit = defineEmits([ReloadPaginationEmit]);

usePagination(PaginationSelector, emit);
</script>
