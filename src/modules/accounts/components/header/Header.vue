<template>
  <header class="b-header">
    <div class="wrap b-section">
      <div class="b-section__header b-header__section">

        <span class="b-header__title">
          {{ loc.title }}
        </span>

        <form
          class="b-header__controls"
          @submit.prevent.native="handleSearch(search)"
        >

          <el-autocomplete
            v-model="search"
            :fetch-suggestions="querySearchAsync"
            class="b-input b-input_header"
            placeholder="Search"
            popper-class="b-select__popper"
            @select="(item) => handleSearch(item.value)"
          >
            <template #prefix>
              <el-icon
                class="el-input__icon"
                v-html="iconSearch"
                @click="handleSearch(search)"
              >
              </el-icon>
            </template>
          </el-autocomplete>

          <el-button
            class="b-btn b-btn_primary"
            native-type="button"
            @click="openModal"
          >
            {{ loc.createBtnTitle }}
          </el-button>

        </form>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ElIcon, ElButton, ElAutocomplete } from 'element-plus';
import { ref, computed } from 'vue';
import useTranslation from '@/core/composable/useTranslation.js';
import { getIcon } from '@/core/lib/template.js';
import { getContextSearch } from '@/core/api/accounts.js';
import Converter from '@/core/lib/helpers/converter.js';
import Request from '@/core/lib/request.js';
import ContextSearchModel from '@/core/models/ContextSearchModel.js';
import { AccountLoginFieldCode, FieldContextSearchCode } from '@/core/lib/constants.js';

const loc = useTranslation('header');

const { roleCode } = defineProps({
  roleCode: {
    type: String,
    default: ''
  }
});

/**
 * @type {String}
 */
const search = ref('');

const emit = defineEmits(['open-modal', 'search']);

/**
 * @type {String}
 */
const iconSearch = computed(() => getIcon('search'));

const openModal = () => {
  emit('open-modal', true);
}

/**
 * @param {String} queryString
 * @param {Function} callback
 */
const querySearchAsync = async (queryString, callback) => {
  let searchString = "";
  if (!!queryString || !!roleCode) {
    const request = new Request();
    const contextObj = new ContextSearchModel({
      search: queryString,
      roleCode: roleCode
    });
    searchString = request.getQueryString(contextObj);
  }
  await getContextSearch(searchString)
    .then((response) => {
      const searchStrings = Converter.changeArrayObjectsCode(response?.data, AccountLoginFieldCode, FieldContextSearchCode);
      callback(searchStrings);
    })
    .catch((error) => {
      console.error('GET error:{accounts/search}', error);
      callback([]);
    });
}

/**
 * @param {String} value
 */
const handleSearch = (value) => {
  emit('search', value);
}

</script>
