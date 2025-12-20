<template>
  <el-dialog
    class="b-dialog"
    :model-value="toggle"
    :title="title"
    :show-close="false"
    :before-close="close"
    align-center
  >
    <template #header="{ close }">
      <span class="b-dialog__title">{{ title }}</span>
      <a
        class="b-dialog__close"
        v-html="iconClose"
        href="javascript:void(0)"
        @click="close"
      />
    </template>
    <slot />
  </el-dialog>
</template>
<script setup>
import { computed } from 'vue';
import { ElDialog } from 'element-plus';
import { TemplateHelper } from '@/core';

const { toggle, title } = defineProps({
  toggle: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);

/**
 * @type {import('vue').ComputedRef<String>}
 */
const iconClose = computed(() => TemplateHelper.getIcon('close'));

const close = () => {
  emit('close');
};
</script>
