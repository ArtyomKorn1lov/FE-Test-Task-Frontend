<template>
  <div class="wrap b-section b-section_page">
    <div class="b-section__content">
      <Controls
        :count="itemsCount"
        :disable-edit-btn="disableEditTop"
        :role-code="filter.roleCode"
        :role-name="selectedRoleName"
        @clear-role="onSelectRole"
        @delete-items="deleteSelectedItems"
        @edit-item="editSelectedItem"
      />
      <div class="b-account">
        <AccountTop
          :is-selected="isSelectAll"
          :sort="filter.sort"
          :order="filter.order"
          @select-all="onSelectAll"
          @set-sort="setSortValues"
        />
        <AccountList
          v-if="showItems"
          :items="items"
          :selected-items="selectedItems"
          :is-loading="isLoading"
          @select-item="onSelectItem"
          @select-role="onSelectRole"
          @refresh="refresh"
          @after-delete-item="afterDeleteItem"
          @edit-item="editItem"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import useTranslation from '@/core/composable/translations.js';
import Request from '@/core/lib/request.js';
import { getAccounts, deleteAccounts } from '@/core/api/accounts.js';
import AccountModel from '@/core/models/AccountModel.js';
import AccountList from '@/modules/accounts/components/account/AccountList.vue';
import AccountTop from '@/modules/accounts/components/account/AccountTop.vue';
import Controls from '@/modules/accounts/components/controls/Controls.vue';
import FilterModel from '@/core/models/FilterModel.js';
import PaginationModel from '@/core/models/PaginationModel.js';
import SelectItemModel from '@/core/models/SelectItemModel.js';
import SelectRoleModel from '@/core/models/SelectRoleModel.js';
import NextPageModel from '@/core/models/NextPageModel.js';
import AccountDeleteModel from '@/core/models/AccountDeleteModel.js';
import ModalModel from '@/core/models/ModalModel.js';
import { OneCountElement, FirstElementIndex, ASCorderCode, DESCorderCode, SuccessStatusCode, AccountFormComponentModalCode } from '@/core/lib/constants.js';
import SortModel from '@/core/models/SortModel.js';

const loc = useTranslation('modal');

/**
 * @type {Array<AccountModel>}
 */
const items = ref([]);
/**
 * @type {Array<Number>}
 */
const selectedItems = ref([]);
/**
 * @type {Boolean}
 */
const isSelectAll = ref(false);
/**
 * @type {Boolean}
 */
const isLoading = ref(true);
/**
 * @type {Boolean}
 */
const isInit = ref(false);
/**
 * @type {String}
 */
const selectedRoleName = ref('');

const store = useStore();

/**
 * @type {FilterModel}
 */
const filter = computed(() => store.getters.getFilter);
/**
 * @type {PaginationModel}
 */
const pagination = computed(() => store.getters.getPagination);
/**
 * @type {Boolean}
 */
const showItems = computed(() => {
  return !!items.value && items.value.length > 0;
});
/**
 * @type {Number}
 */
const itemsCount = computed(() => {
  return selectedItems.value.length;
});
/**
 * @type {Boolean}
 */
const disableEditTop = computed(() => {
  return selectedItems.value.length > OneCountElement;
});

watch(filter, async () => {
  if (!!isInit.value) {
    return;
  }
  onSelectAll(false);
  items.value = [];
  isLoading.value = true;
  store.commit('setPaginationValues', new NextPageModel({
    page: OneCountElement
  }));
  await refresh();
});

/**
 * @param {SelectItemModel} obj
 */
const onSelectItem = (obj) => {
  isSelectAll.value = false;
  if (!!obj.value) {
    !selectedItems.value.includes(obj.id)
      && (selectedItems.value.push(obj.id));
    return;
  }
  selectedItems.value = selectedItems.value.filter((item) => item !== obj.id);
}

/**
 * @param {Boolean} value
 */
const onSelectAll = (value) => {
  isSelectAll.value = value;
  if (!!value) {
    selectedItems.value = items.value.map((item) => item.id);
    return;
  }
  selectedItems.value = [];
}

/**
 * @param {SelectRoleModel} obj
 */
const onSelectRole = (obj) => {
  store.commit('setFilterValues', {
    roleCode: obj.roleCode
  });
  selectedRoleName.value = obj.roleName;
}

const afterDeleteItem = () => {
  store.commit('setFilterValues', new FilterModel({
    ...filter.value
  }));
}

/**
 * @param {SortModel} obj
 */
const setSortValues = (obj) => {
  (obj.sort === filter.value.sort)
    ? (obj.order = obj.order === ASCorderCode ? DESCorderCode : ASCorderCode)
    : (obj.order = ASCorderCode);
  store.commit('setFilterValues', obj);
}

const deleteSelectedItems = async () => {
  await deleteAccounts(new AccountDeleteModel({
    ids: selectedItems.value
  }))
    .then((response) => {
      ElMessage({
        type: SuccessStatusCode,
        message: response?.data,
      });
      afterDeleteItem();
    })
    .catch((error) => {
      console.error('POST error:{accounts/delete}', error);
    });
}

const editSelectedItem = () => {
  editItem(selectedItems.value[0]);
}

/**
 * @param {Number} id
 */
const editItem = (id) => {
  if (!id) {
    return;
  }
  store.commit('setModalProps', new ModalModel({
    toggle: true,
    title: loc.value.account.titleEdit,
    code: AccountFormComponentModalCode,
    accountEditId: id
  }));
}

const refresh = async () => {
  const request = new Request();
  const queryObj = {...filter.value, ...pagination.value};
  const queryString = request.getQueryString(queryObj);
  await getAccounts(queryString)
    .then((response) => {
      /**
       * @type {Array<AccountModel>}
       */
      const responseDataList = response?.data?.map((item) => {
        return new AccountModel(item);
      });
      items.value = items.value.concat(responseDataList);
      store.dispatch('nextPage', responseDataList.length)
        .then((result) => {
          isLoading.value = result;
        });
    })
    .catch((error) => {
      console.error('GET error:{accounts/list}', error);
      store.dispatch('nextPage', FirstElementIndex)
      .then((result) => {
          isLoading.value = result;
        });
    });
}

const onInit = async () => {
  isInit.value = true;
  await store.dispatch('initFilterValues');
  await store.dispatch('initPagination');
  await refresh();
  isInit.value = false;
}

onInit();

</script>
