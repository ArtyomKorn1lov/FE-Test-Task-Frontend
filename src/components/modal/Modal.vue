<template>
    <el-dialog
        v-model="toggleModal"
        :title="title"
        align-center
    >
        <slot></slot>
    </el-dialog>
</template>
<script setup>
import { ElDialog } from 'element-plus';
import { ref, watch } from 'vue';
import { CloseModalModel } from '@/models/ModalModel';

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

const toggleModal = ref(false);

watch(() => toggle,
  /** @param {boolean} newValue */
  (newValue) => {
    if (newValue === toggleModal.value || newValue === false) {
      return;
    }
    toggleModal.value = newValue;
  });

watch(toggleModal,
  /** @param {boolean} newValue */
  (newValue) => {
    if (newValue === toggle.value || newValue === true) {
      return;
    }
    emit('close', new CloseModalModel({
      toggle: false
    }));
  });
</script>
