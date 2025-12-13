<template>
  <div class="wrap b-section b-section_page">
    <div class="b-section__content">
      <AccountControls
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
        <div
          v-if="showItems"
          class="b-account__list custom-scroll overflow-y"
          :class="AccountListWrapperClass"
        >
          <AccountCard
            v-for="item in items"
            :key="item.id"
            :element="item"
            :is-selected="isSelectedItem(item.id)"
            @select-item="onSelectItem"
            @select-role="onSelectRole"
            @delete="deleteItem"
            @edit="editItem"
          />
          <PaginationComponent
            v-if="isLoading"
            @refresh="refresh"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore, Store } from 'vuex';
import { useI18n } from 'vue-i18n';
import { SortTypes } from '@/core';
import { Pagination as PaginationComponent, ModalParams } from '@/modules/ui';
import { AccountListWrapperClass } from '@/modules/accounts/constants';
import { AccountControls, AccountTop, AccountCard } from '@/modules/accounts/components';
import { ModalComponentsCodes } from '@/modules/accounts/enums';
import { AccountStore, Account, Filter, FilterRole, Sort, SelectRole, SelectItem } from '@/modules/accounts/models';

const { t } = useI18n();

/**
 * @type {Store<AccountStore>}
 */
const store = useStore();

/**
 * @type {import('vue').ComputedRef<Filter>}
 */
const filter = computed(() => store.getters.getFilter);
/**
 * @type {import('vue').ComputedRef<Account[]>}
 */
const items = computed(() => store.getters.getItems);
/**
 * @type {import('vue').ComputedRef<Boolean>}
 */
const isLoading = computed(() => store.getters.getIsLoading);
/**
 * @type {import('vue').ComputedRef<Number[]>}
 */
const selectedItems = computed(() => store.getters.getSelectedItems);
/**
 * @type {import('vue').Ref<Boolean>}
 */
const isSelectAll = computed(() => store.getters.getIsSelectAll);
/**
 * @type {import('vue').Ref<String>}
 */
const selectedRoleName = computed(() => store.getters.getSelectedRoleName);
/**
 * @type {import('vue').ComputedRef<Boolean>}
 */
const showItems = computed(() => !!items.value && items.value.length > 0);
/**
 * @type {import('vue').ComputedRef<Number>}
 */
const itemsCount = computed(() => selectedItems.value.length);
/**
 * @type {import('vue').ComputedRef<Boolean>}
 */
const disableEditTop = computed(() => selectedItems.value.length > 1);

/**
 * @param {Number} id
 */
const isSelectedItem = (id) => {
  return selectedItems.value.includes(id);
};

/**
 * @param {SelectItem} obj
 */
const onSelectItem = (obj) => {
  store.dispatch('onSelectItem', obj);
};

/**
 * @param {Boolean} value
 */
const onSelectAll = (value) => {
  store.dispatch('onSelectAll', value);
};

/**
 * @param {SelectRole} obj
 */
const onSelectRole = async (obj) => {
  store.commit('setSelectedRole', obj.roleName);
  await store.dispatch(
    'onFilter',
    new FilterRole({
      roleCode: obj.roleCode,
    }),
  );
};

/**
 * @param {Number} id
 * @returns {Promise<void>}
 */
const deleteItem = async (id) => {
  await store.dispatch('onDeleteItem', id);
};

/**
 * @returns {Promise<void>}
 */
const deleteSelectedItems = async () => {
  await store.dispatch('onDeleteSelectedItems');
};

/**
 * @param {Sort} obj
 */
const setSortValues = async (obj) => {
  obj.sort === filter.value.sort ? (obj.order = obj.order === SortTypes.asc ? SortTypes.desc : SortTypes.asc) : (obj.order = SortTypes.asc);
  await store.dispatch('onFilter', obj);
};

const editSelectedItem = () => {
  const id = selectedItems.value[0];
  if (!id) {
    return;
  }
  editItem(id);
};

/**
 * @param {Number} id
 */
const editItem = (id) => {
  if (!id) {
    return;
  }
  store.commit(
    'setModalProps',
    new ModalParams({
      toggle: true,
      title: t('accounts.modal.titleEdit'),
      code: ModalComponentsCodes.account,
      accountEditId: id,
    }),
  );
};

const refresh = async () => {
  await store.dispatch('addAccountList');
};

const onInit = async () => {
  await store.dispatch('initFilterValues');
  await store.dispatch('initPagination');
  await store.dispatch('initAccountList');
};

onInit();
</script>
