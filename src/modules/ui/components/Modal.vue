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
      <button
        @click="close"
        class="b-dialog__close"
        v-html="iconClose"
      >
      </button>
    </template>
    <slot />
  </el-dialog>
</template>
<script setup>
import {computed, ComputedRef, EmitFn} from 'vue';
import {ElDialog} from 'element-plus';
import {TemplateHelper} from "@/core";
import {CloseModalParams} from "@/modules/ui/models";

const {toggle, title} = defineProps({
  toggle: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ""
  }
});

/**
 * @type {EmitFn<String[]>}
 */
const emit = defineEmits(['close']);

/**
 * @type {ComputedRef<String>}
 */
const iconClose = computed(() => TemplateHelper.getIcon('close'));

const close = () => {
  emit('close', new CloseModalParams({
    toggle: false
  }));
}

</script>
