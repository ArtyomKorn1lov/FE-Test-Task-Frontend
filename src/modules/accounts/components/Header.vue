<template>
  <header class="b-header">
    <div class="wrap b-section">
      <div class="b-section__header b-header__section">

        <span class="b-header__title">
          {{ loc.title }}
        </span>

        <form
          class="b-header__controls"
          @submit.prevent.native="search(searchString)"
        >

          <el-autocomplete
            v-model="searchString"
            :fetch-suggestions="contextSearch"
            class="b-input b-input_header"
            placeholder="Search"
            popper-class="b-select__popper"
            @select="(item) => search(item.value)"
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
            {{ loc.createBtnTitle }}
          </el-button>

        </form>
      </div>
    </div>
  </header>
</template>
<script setup>
import {ref, computed, ComputedRef, Ref} from 'vue';
import {useStore, Store} from "vuex";
import {ElIcon, ElButton, ElAutocomplete} from 'element-plus';
import {
  TemplateHelper,
  ArrayHelper,
  InversionControl,
  useFetch,
  useTranslation
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
import {SearchAccounts} from "@/modules/accounts";
import {
  AccountLoginFieldCode,
  FieldContextSearchCode
} from "@/modules/accounts/constants";

/**
 * @type {ComputedRef<Object>}
 */
const loc = useTranslation('header');

/**
 * @type {SearchAccounts}
 */
const searchAccounts = InversionControl.resolve("SearchAccounts");

/**
 * @type {Store<AccountStore>}
 */
const store = useStore();

/**
 * @type {Ref<String>}
 */
const searchString = ref('');

/**
 * @type {ComputedRef<String>}
 */
const iconSearch = computed(() => TemplateHelper.getIcon('search'));

/**
 * @type {ComputedRef<Filter>}
 */
const filter = computed(() => store.getters.getFilter);

/**
 * @type {(function(object: ContextSearch): Promise<ContextSearchResponse>)}
 */
const fetchContextSearch = useFetch({
  ajaxFunc: searchAccounts.execute
});

const openModal = () => {
  store.commit('setModalProps', new ModalParams({
    toggle: true,
    title: loc.value.account.titleCreate,
    code: ModalComponentsCodes.account
  }));
}

/**
 * @param {String} queryString
 * @param {Function} callback
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
const search = (value) => {
  store.dispatch('onFilter', new Search({
    search: value
  }));
}

</script>
