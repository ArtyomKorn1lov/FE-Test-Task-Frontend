<template>
  <div class="b-account__top b-account__row">
    <div class="b-account__col">
      <div class="b-account__inside b-account__inside_table">
        <el-checkbox
          class="b-checkbox"
          v-model="selected"
          @change="selectAllItems"
        >
        </el-checkbox>
        <a
          class="b-account__table"
          href="javascript:void(0)"
          @click="setSortValues(AccountSortPropCode)"
        >
          <span class="b-account__table-title b-account__table-title_left">
            {{ loc.userColTitle }}
          </span>
          <span
            v-if="sort === AccountSortPropCode"
            class="b-account__arrow-icon"
            :class="{'b-account__arrow-icon_rotate': order === DESCorderCode}"
            v-html="iconArrow"
          >
          </span>
        </a>
      </div>
    </div>
    <div class="b-account__col">
      <div class="b-account__inside b-account__inside_table b-account__inside_right">
        <a
          class="b-account__table"
          href="javascript:void(0)"
          @click="setSortValues(PermissionNameSortPropCode)"
        >
          <span class="b-account__table-title">
            {{ loc.permissionColTitle }}
          </span>
          <span
            v-if="sort === PermissionNameSortPropCode"
            class="b-account__arrow-icon"
            :class="{'b-account__arrow-icon_rotate': order === DESCorderCode}"
            v-html="iconArrow"
          >
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import { ElCheckbox } from 'element-plus';
import useTranslation from '@/core/composable/translations.js';
import { getIcon } from '@/core/lib/template.js';
import { AccountSortPropCode, PermissionNameSortPropCode, DESCorderCode, ASCorderCode } from '@/core/lib/constants.js';
import SortModel from '@/core/models/SortModel.js';

const loc = useTranslation('accountSection');

const { isSelected, sort, order } = defineProps({
  isSelected: {
    type: Boolean,
    default: false
  },
  sort: {
    type: String,
    default: ''
  },
  order: {
    type: String,
    default: ASCorderCode
  }
});

const emit = defineEmits(['select-all', 'set-sort']);

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

/**
 * @param {String} value
 */
const setSortValues = (value) => {
  emit('set-sort', new SortModel({
    sort: value,
    order: order
  }));
}

</script>
