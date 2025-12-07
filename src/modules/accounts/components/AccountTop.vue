<template>
  <div class="b-account__top b-account__row">
    <div class="b-account__col">
      <div class="b-account__inside b-account__inside_table">
        <el-checkbox
          class="b-checkbox"
          :model-value="isSelected"
          @change="selectAllItems"
        />
        <a
          class="b-account__table"
          href="javascript:void(0)"
          @click="setSortValues(AccountSortPropCode)"
        >
          <span class="b-account__table-title b-account__table-title_left">
            {{ t('accounts.section.userColTitle') }}
          </span>
          <span
            v-if="sort === AccountSortPropCode"
            class="b-account__arrow-icon"
            :class="{'b-account__arrow-icon_rotate': order === SortTypes.desc}"
            v-html="TemplateHelper.getIcon('arrow')"
          />
        </a>
      </div>
    </div>
    <div class="b-account__col">
      <div
        class="b-account__inside b-account__inside_table b-account__inside_right">
        <a
          class="b-account__table"
          href="javascript:void(0)"
          @click="setSortValues(PermissionNameSortPropCode)"
        >
          <span class="b-account__table-title">
            {{ t('accounts.section.permissionColTitle') }}
          </span>
          <span
            v-if="sort === PermissionNameSortPropCode"
            class="b-account__arrow-icon"
            :class="{'b-account__arrow-icon_rotate': order === SortTypes.desc}"
            v-html="TemplateHelper.getIcon('arrow')"
          />
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ElCheckbox} from 'element-plus';
import {useI18n} from "vue-i18n";
import {TemplateHelper, SortTypes} from "@/core";
import {
  AccountSortPropCode,
  PermissionNameSortPropCode
} from "@/modules/accounts/constants";
import {Sort} from "@/modules/accounts/models";

const {t} = useI18n();

const {isSelected, sort, order} = defineProps({
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
    default: SortTypes.asc
  }
});

const emit = defineEmits(['select-all', 'set-sort']);

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
  emit('set-sort', new Sort({
    sort: value,
    order: order
  }));
}
</script>
