<template>
  <a
    href="javascript:void(0)"
    class="b-account__item"
    :class="{ 'b-account__item_selected': isSelected }"
    @click.prevent.stop="clickItemCard"
  >
    <div class="b-account__item-inside b-account__row">
      <div class="b-account__col b-account__col_left">
        <div class="b-account__inside">
          <el-checkbox
            class="b-checkbox"
            :model-value="isSelected"
            @change.prevent.stop="selectItem"
          >
          </el-checkbox>
          <div class="b-account__img-wrap">
            <img
              class="b-account__img"
              :src="picture"
              :alt="element.login"
            />
          </div>
          <div class="b-account__info">
            <span class="b-account__name">
              {{ element.login }}
            </span>
            <a
              v-if="element.email"
              :href="emailLink"
              class="b-account__email"
            >
              {{ element.email }}
            </a>
          </div>
        </div>
      </div>
      <div class="b-account__col">
        <div class="b-account__inside b-account__inside_editable">
          <el-button
            class="b-btn b-btn_tag"
            :class="tagClassModifier"
            @click.prevent.stop="selectRole"
          >
            {{ element.role }}
          </el-button>
          <div class="b-controls__btns b-account__controls">
            <el-button
              class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
              v-html="'<span>' + TemplateHelper.getIcon('edit') + t('accounts.section.editBtnTitle') + '</span>'"
              @click.prevent.stop="editItem"
              :disabled="disableActions"
            />
            <el-button
              class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
              v-html="'<span>' + TemplateHelper.getIcon('delete') + '</span>'"
              @click.prevent.stop="deleteItem"
              :disabled="disableActions"
            />
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script setup>
import { computed } from 'vue';
import { ElButton, ElCheckbox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { TemplateHelper } from '@/core';
import { NoImageUrl, TagAccountListModifier } from '@/modules/accounts/constants';
import { Account, SelectItem, SelectRole } from '@/modules/accounts/models';

const { t } = useI18n();

const { element, isSelected, disableActions } = defineProps({
  element: {
    type: Account,
    default: {},
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  disableActions: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['select-item', 'select-role', 'delete', 'edit']);

/**
 * @type {import('vue').ComputedRef<String>}
 */
const emailLink = computed(() => {
  return `mailto:${element?.email}`;
});
/**
 * @type {import('vue').ComputedRef<String>}
 */
const picture = computed(() => {
  return element?.picture ? element?.picture : NoImageUrl;
});
/**
 * @type {import('vue').ComputedRef<String>}
 */
const tagClassModifier = computed(() => {
  return `${TagAccountListModifier}${element?.roleCode}`;
});

const clickItemCard = () => {
  selectItem(!isSelected);
};

/**
 * @param {Boolean} value
 */
const selectItem = (value) => {
  emit(
    'select-item',
    new SelectItem({
      value: value,
      id: element.id,
    }),
  );
};

const selectRole = () => {
  emit(
    'select-role',
    new SelectRole({
      roleCode: element.roleCode,
      roleName: element.role,
    }),
  );
};

const deleteItem = () => {
  emit('delete', element.id);
};

const editItem = () => {
  emit('edit', element.id);
};
</script>
