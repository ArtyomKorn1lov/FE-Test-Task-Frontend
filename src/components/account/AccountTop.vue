<template>
  <div class="b-account__top b-account__row">
    <div class="b-account__col">
      <div class="b-account__inside b-account__inside_table">
        <el-checkbox
          class="b-checkbox"
          v-model="selected"
          @change="selectAllItems"
        >
          User
        </el-checkbox>
      </div>
    </div>
    <div class="b-account__col">
      <div class="b-account__inside b-account__inside_table b-account__inside_right">
        <span class="b-account__table-title">
          Permission
        </span>
        <span
          class="b-account__arrow-icon"
          v-html="iconArrow"
        >
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import { ElCheckbox } from 'element-plus';
import { getIcon } from '@/lib/template';

const { isSelected } = defineProps({
  isSelected: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-all']);

/**
 * @type {Boolean}
 */
const selected = ref(false);

/**
 * @type {String}
 */
const iconArrow = computed(() => getIcon('arrow'));

watch(() => isSelected, (newValue) => {
  selected.value = newValue;
});

/**
 * @param {Boolean} value
 */
const selectAllItems = (value) => {
  emit('select-all', value);
}

</script>
