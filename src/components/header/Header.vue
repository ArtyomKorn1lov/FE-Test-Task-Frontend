<template>
  <header class="b-header">
    <div class="wrap b-section">
      <div class="b-section__header b-header__section">

        <span class="b-header__title">
          Account users
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
            Connect users
          </el-button>

        </form>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ElIcon, ElButton, ElAutocomplete } from 'element-plus';
import { ref, computed } from 'vue';
import { getIcon } from '@/lib/template';
import { getContextSearch } from '@/api/accounts';
import Converter from '@/lib/helpers/converter';
import Request from '@/lib/request';
import ContextSearchModel from '@/models/ContextSearchModel';
import { AccountLoginFieldCode, FieldContextSearchCode } from '@/lib/constants';

const { roleCode } = defineProps({
  roleCode: {
    type: String,
    default: ''
  }
});

const search = ref('');

const emit = defineEmits(['open-modal', 'search']);

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
