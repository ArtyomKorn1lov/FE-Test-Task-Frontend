<template>
  <a
    href="javascript:void(0)"
    class="b-account__item"
    :class="{'b-account__item_selected': selected}"
    @click.prevent.stop="clickItemCard"
  >
    <div class="b-account__item-inside b-account__row">
      <div class="b-account__col b-account__col_left">
        <div class="b-account__inside">
          <el-checkbox
            class="b-checkbox"
            v-model="selected"
            @change.prevent.stop="selectItem"
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
              v-html="'<span>' + iconEdit + loc.editBtnTitle + '</span>'"
              @click.prevent.stop="editItem"
            >
            </el-button>
            <el-button
              class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
              v-html="'<span>' + iconDelete + '</span>'"
              @click.prevent.stop="deleteItem"
              :disabled="disabledDelete"
            >
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script setup>
import { ElButton, ElCheckbox, ElMessage } from 'element-plus';
import { computed, ref, watch } from 'vue';
import useTranslation from '@/core/composable/useTranslation.js';
import AccountModel from '@/core/models/AccountModel.js';
import { deleteAccount } from '@/core/api/accounts.js';
import { NoImageUrl, TagAccountListModifier, SuccessStatusCode, ErrorStatusCode } from '@/core/lib/constants.js';
import { getIcon, confirmedAction } from '@/core/lib/template.js';
import SelectItemModel from '@/core/models/SelectItemModel.js';
import SelectRoleModel from '@/core/models/SelectRoleModel.js';

const loc = useTranslation('accountSection');

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

const emit = defineEmits(['select-item', 'select-role', 'after-delete-item', 'edit-item']);

/**
 * @type {Boolean}
 */
const selected = ref(false);
/**
 * @type {Boolean}
 */
const disabledDelete = ref(false);

/**
 * @type {String}
 */
const iconDelete = computed(() => getIcon('delete'));
/**
 * @type {String}
 */
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

const clickItemCard = () => {
  selected.value = !selected.value;
  selectItem(selected.value);
}

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

const deleteItem = async () => {
  await confirmedAction(
    loc.value.deleteItem.questionTitle,
    loc.value.deleteItem.questionDescription,
    async () => {
      disabledDelete.value = true;
      await deleteAccount(element.id)
        .then((response) => {
          ElMessage({
            type: SuccessStatusCode,
            message: response?.data,
          });
          emit('after-delete-item');
        })
        .catch((error) => {
          console.error('DELETE error:{accounts/delete}', error);
          disabledDelete.value = false;
          ElMessage({
            type: ErrorStatusCode,
            message: error,
          });
        });
    },
    loc.value.deleteItem.cancelBtnTitle
  );
}

const editItem = () => {
  emit('edit-item', element.id);
}

</script>
