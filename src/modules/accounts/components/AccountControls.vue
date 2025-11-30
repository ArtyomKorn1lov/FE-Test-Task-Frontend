<template>
  <div class="b-controls">
    <span class="b-controls__title">
      {{ count }} {{ t('controls.userCountLabel') }}
    </span>
    <div
      v-if="showBtnGroup"
      class="b-controls__btns"
    >
      <el-button
        v-if="!disableEditBtn"
        class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
        v-html="'<span>' + TemplateHelper.getIcon('edit') + t('controls.editBtnTitle') + '</span>'"
        @click="editItem"
      >
      </el-button>
      <el-button
        class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
        v-html="'<span>' + TemplateHelper.getIcon('delete') + t('controls.deleteBtnTitle') + '</span>'"
        @click="deleteItems"
      >
      </el-button>
    </div>
    <el-button
      v-if="!!roleCode"
      class="b-btn b-btn_tag b-btn_tag-controls b-btn_icon"
      :class="tagClassModifier"
      @click="clearRoleFilter"
    >
      {{ roleName }}
      <el-icon>
        <CircleClose/>
      </el-icon>
    </el-button>
  </div>
</template>
<script setup>
import {computed, ComputedRef} from 'vue';
import {ElButton, ElIcon} from 'element-plus';
import {CircleClose} from '@element-plus/icons-vue';
import {useI18n} from "vue-i18n";
import {
  TemplateHelper,
} from "@/core";
import {TagAccountListModifier} from "@/modules/accounts/constants";
import {SelectRole} from "@/modules/accounts/models";

const {t} = useI18n();

const {count, disableEditBtn, roleCode, roleName} = defineProps({
  count: {
    type: Number,
    default: 0
  },
  disableEditBtn: {
    type: Boolean,
    default: false
  },
  roleCode: {
    type: String,
    default: ''
  },
  roleName: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['clear-role', 'delete-items', 'edit-item']);

/**
 * @type {ComputedRef<Boolean>}
 */
const showBtnGroup = computed(() => {
  return count > 0;
});
/**
 * @type {ComputedRef<String>}
 */
const tagClassModifier = computed(() => {
  return `${TagAccountListModifier}${roleCode}`
});

const clearRoleFilter = () => {
  emit('clear-role', new SelectRole({
    roleCode: '',
    roleName: ''
  }));
}

const deleteItems = () => {
  emit('delete-items');
}

const editItem = () => {
  emit('edit-item');
}

</script>
