<template>
  <!-- b-account__item_selected -->
  <a href="javascript:void(0)" class="b-account__item">
    <div class="b-account__item-inside b-account__row">
      <div class="b-account__col b-account__col_left" data-label="User">
        <div class="b-account__inside">
          <el-checkbox class="b-checkbox"></el-checkbox>
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
import { computed } from 'vue';
import { NoImageUrl, TagAccountListModifier } from '@/lib/constants';
import { getIcon } from '@/lib/template';

const { element } = defineProps({
  element: {
    type: AccountModel,
    default: {}
  }
});

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

</script>
