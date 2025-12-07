<template>
  <header class="b-header">
    <div class="wrap b-section">
      <div class="b-section__header b-header__section">

        <span class="b-header__title">
          {{ t('header.title') }}
        </span>

        <div class="b-header__controls">

          <el-autocomplete
            v-model="searchString"
            :fetch-suggestions="contextSearch"
            class="b-input b-input_header"
            placeholder="Search"
            popper-class="b-select__popper"
            clearable
            @select="(item) => search(item.value)"
            @clear="search('')"
          >
            <template #prefix>
              <el-icon
                class="el-input__icon"
                v-html="iconSearch"
                @click="search(searchString)"
              >
              </el-icon>
            </template>
          </el-autocomplete>

          <el-button
            class="b-btn b-btn_primary"
            native-type="button"
            @click="openModal"
          >
            {{ t('header.createBtnTitle') }}
          </el-button>

        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import {ref, computed} from 'vue';
import {useStore, Store} from "vuex";
import {ElIcon, ElButton, ElAutocomplete} from 'element-plus';
import {useI18n} from "vue-i18n";
import {
  TemplateHelper,
  ArrayHelper,
  DependencyInjection,
  useFetch,
} from "@/core";
import {ModalParams} from "@/modules/ui";
import {ModalComponentsCodes} from "@/modules/accounts/enums";
import {
  AccountStore,
  Search,
  Filter,
  ContextSearch,
  ContextSearchResponse
} from "@/modules/accounts/models";
import {SearchAccounts} from "@/modules/accounts/use-case";
import {
  AccountLoginFieldCode,
  FieldContextSearchCode
} from "@/modules/accounts/constants";

const {t} = useI18n();

/**
 * @type {SearchAccounts}
 */
const searchAccounts = DependencyInjection.resolve("SearchAccounts");

/**
 * @type {Store<AccountStore>}
 */
const store = useStore();

/**
 * @type {import('vue').Ref<String>}
 */
const searchString = ref('');

/**
 * @type {import('vue').ComputedRef<String>}
 */
const iconSearch = computed(() => TemplateHelper.getIcon('search'));
/**
 * @type {import('vue').ComputedRef<Filter>}
 */
const filter = computed(() => store.getters.getFilter);

/**
 * @type {(function(object: ContextSearch): Promise<ContextSearchResponse>)}
 */
const fetchContextSearch = useFetch({
  useCase: searchAccounts
});

const openModal = () => {
  store.commit('setModalProps', new ModalParams({
    toggle: true,
    title: t('modal.account.titleCreate'),
    code: ModalComponentsCodes.account
  }));
}

/**
 * @param {String} queryString
 * @param {VoidFunction} callback
 */
const contextSearch = async (queryString, callback) => {
  try {
    const searchModel = new ContextSearch({
      search: queryString,
      roleCode: filter.value.roleCode ?? ""
    });
    const response = await fetchContextSearch(searchModel);
    callback(ArrayHelper.changeArrayObjectsCode(response, AccountLoginFieldCode, FieldContextSearchCode));
  } catch (e) {
    callback([]);
  }
}

/**
 * @param {String} value
 */
const search = async (value) => {
  await store.dispatch('onFilter', new Search({
    search: value
  }));
}

</script>
