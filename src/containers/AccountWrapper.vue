<template>
  <div class="wrap b-section b-section_page">
    <div class="b-section__content">
      <Controls
        :count="itemsCount"
        :disable-edit-btn="disableEditTop"
      />
      <div class="b-account">
        <AccountTop
          :is-selected="isSelectAll"
          @select-all="onSelectAll"
        />
        <AccountList
          v-if="showItems"
          :items="items"
          :selected-items="selectedItems"
          :is-loading="isLoading"
          @select-item="onSelectItem"
          @select-role="onSelectRole"
          @refresh="refresh"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Request from '@/lib/request';
import { getAccounts } from '@/api/accounts';
import AccountModel from '@/models/AccountModel';
import AccountList from '@/components/account/AccountList.vue';
import AccountTop from '@/components/account/AccountTop.vue';
import Controls from '@/components/controls/Controls.vue';
import FilterModel from '@/models/FilterModel';
import PaginationModel from '@/models/PaginationModel';
import SelectItemModel from '@/models/SelectItemModel';
import SelectRoleModel from '@/models/SelectRoleModel';
import NextPageModel from '@/models/NextPageModel';
import { OneCountElement, FirstElementIndex } from '@/lib/constants';

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
  items.value = [];
  isLoading.value = true;
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
  store.commit('setFilterValues', obj);
  store.commit('setPaginationValues', new NextPageModel({
    page: OneCountElement
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
