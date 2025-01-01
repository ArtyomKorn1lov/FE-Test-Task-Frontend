<template>
  <div class="b-controls">
    <span class="b-controls__title">
      {{ count }} users selected
    </span>
    <div
      v-if="showBtnGroup"
      class="b-controls__btns"
    >
      <el-button
        v-if="!disableEditBtn"
        class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
        v-html="'<span>' + iconEdit + 'Edit' + '</span>'"
      >
      </el-button>
      <el-button
        class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
        v-html="'<span>' + iconDelete + 'Delete' + '</span>'"
      >
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { ElButton } from 'element-plus';
import { getIcon } from '@/lib/template';

const { count, disableEditBtn } = defineProps({
  count: {
    type: Number,
    default: 0
  },
  disableEditBtn: {
    type: Boolean,
    default: false
  }
});

/**
 * @type {String}
 */
const iconDelete = computed(() => getIcon('delete'));
/**
 * @type {String}
 */
const iconEdit = computed(() => getIcon('edit'));
/**
 * @type {Number}
 */
const showBtnGroup = computed(() => {
  return count > 0;
});
</script>
