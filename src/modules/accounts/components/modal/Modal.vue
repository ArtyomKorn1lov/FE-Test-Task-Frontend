<template>
  <el-dialog
    class="b-dialog"
    v-model="toggleModal"
    :title="title"
    :show-close="false"
    :before-close="close"
    align-center
  >
    <template #header="{ close }">
      <span class="b-dialog__title">{{ title }}</span>
      <a
        href="javascript:void(0)"
        @click="close"
        class="b-dialog__close"
        v-html="iconClose"
      >
      </a>
    </template>
    <slot></slot>
  </el-dialog>
</template>
<script setup>
import { ElDialog } from 'element-plus';
import { ref, watch, computed } from 'vue';
import { CloseModalModel } from '@/core/models/ModalModel.js';
import { getIcon } from '@/core/lib/template.js';

const { toggle, title } = defineProps({
  toggle: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(['close']);

/**
 * @type {Boolean}
 */
const toggleModal = ref(false);

watch(() => toggle, (newValue) => {
  toggleModal.value = newValue;
});

/**
 * @type {String}
 */
const iconClose = computed(() => getIcon('close'));

const close = () => {
  emit('close', new CloseModalModel({
      toggle: false
    }));
}

</script>
