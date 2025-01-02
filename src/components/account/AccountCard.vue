<template>
  <a
    href="javascript:void(0)"
    class="b-account__item"
    :class="{'b-account__item_selected': selected}"
  >
    <div class="b-account__item-inside b-account__row">
      <div class="b-account__col b-account__col_left" data-label="User">
        <div class="b-account__inside">
          <el-checkbox
            class="b-checkbox"
            v-model="selected"
            @change="selectItem"
          >
          </el-checkbox>
          <div class="b-account__img-wrap">
            <img
              class="b-account__img"
              :src="picture"
              :alt="element.login"
            >
          </div>
          <div class="b-account__info">
            <span class="b-account__name">
              {{ element.login }}
            </span>
            <a v-if="element.email" :href="emailLink" class="b-account__email">
              {{ element.email }}
            </a>
          </div>
        </div>
      </div>
      <div class="b-account__col" data-label="Permission">
        <div class="b-account__inside b-account__inside_editable">
          <el-button
            class="b-btn b-btn_tag"
            :class="tagClassModifier"
            @click="selectRole"
          >
            {{ element.role }}
          </el-button>
          <div class="b-controls__btns b-account__controls">
            <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
              v-html="'<span>' + iconEdit + 'Edit' + '</span>'">
            </el-button>
            <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon" v-html="'<span>' + iconDelete + '</span>'">
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script setup>
import { ElButton, ElCheckbox } from 'element-plus';
import AccountModel from '@/models/AccountModel';
import { computed, ref, watch } from 'vue';
import { NoImageUrl, TagAccountListModifier } from '@/lib/constants';
import { getIcon } from '@/lib/template';
import SelectItemModel from '@/models/SelectItemModel';
import SelectRoleModel from '@/models/SelectRoleModel';

const { element, isSelected } = defineProps({
  element: {
    type: AccountModel,
    default: {}
  },
  isSelected: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-item', 'select-role']);

/**
 * @type {Boolean}
 */
const selected = ref(false);

/** @type {String} */
const iconDelete = computed(() => getIcon('delete'));
/** @type {String} */
const iconEdit = computed(() => getIcon('edit'));
/**
 * @type {String}
 */
const emailLink = computed(() => {
  return `mailto:${element?.email}`;
});
/**
 * @type {String}
 */
const picture = computed(() => {
  return (!!element?.picture) ? element?.picture : NoImageUrl;
});
/**
 * @type {String}
 */
const tagClassModifier = computed(() => {
  return `${TagAccountListModifier}${element?.roleCode}`
});

watch(() => isSelected, (newValue) => {
  selected.value = newValue;
});

/**
 * @param {Boolean} value
 */
const selectItem = (value) => {
  emit('select-item', new SelectItemModel({
    value: value,
    id: element.id
  }));
}

const selectRole = () => {
  emit('select-role', new SelectRoleModel({
    roleCode: element.roleCode,
    roleName: element.role
  }));
}

</script>
