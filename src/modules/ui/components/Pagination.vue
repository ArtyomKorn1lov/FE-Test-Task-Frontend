<template>
  <el-skeleton
    class="b-skeleton observable"
    :rows="2"
    animated
  />
</template>
<script setup>
import {ElSkeleton} from 'element-plus';
import {useObserverPagination} from "@/modules/ui/composable";
import {ReloadPaginationEmit, PaginationSelector} from "@/modules/ui";

const emit = defineEmits([ReloadPaginationEmit]);

useObserverPagination(PaginationSelector, emit);
</script>
