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
import {computed, ref, Ref, ComputedRef} from 'vue';
import {useStore, Store} from 'vuex';
import {
  MessageHelper,
  DependencyInjection,
  MessageTypes,
  ResponseStatus,
  SortTypes,
  CommonResponse,
  useFetch,
  useTranslation
} from "@/core";
import {Pagination as PaginationComponent, ModalParams} from "@/modules/ui";
import AccountControls from "@/modules/accounts/components/AccountControls";
import AccountTop from "@/modules/accounts/components/AccountTop";
import AccountCard from "@/modules/accounts/components/AccountCard";
import {ModalComponentsCodes} from "@/modules/accounts/enums";
import {
  AccountStore,
  AccountDelete,
  Account,
  Filter,
  Pagination,
  Sort,
  SelectRole,
  SelectItem
} from "@/modules/accounts/models";
import {DeleteAccount, DeleteAccounts} from "@/modules/accounts/use-case";

/**
 * @type {DeleteAccount}
 */
const deleteAccount = DependencyInjection.resolve('DeleteAccount');
/**
 * @type {DeleteAccounts}
 */
const deleteAccounts = DependencyInjection.resolve('DeleteAccounts');

/**
 * @type {ComputedRef<Object>}
 */
const loc = useTranslation('modal');
/**
 * @type {ComputedRef<Object>}
 */
const locSection = useTranslation('accountSection');
/**
 * @type {ComputedRef<Object>}
 */
const locControls = useTranslation('controls');

/**
 * @type {Store<AccountStore>}
 */
const store = useStore();

/**
 * @type {Ref<Number[]>}
 */
const selectedItems = ref([]);
/**
 * @type {Ref<Boolean>}
 */
const isSelectAll = ref(false);
/**
 * @type {Ref<String>}
 */
const selectedRoleName = ref('');

/**
 * @type {ComputedRef<Filter>}
 */
const filter = computed(() => store.getters.getFilter);
/**
 * @type {ComputedRef<Account[]>}
 */
const items = computed(() => store.getters.getItems);
/**
 * @type {ComputedRef<Boolean>}
 */
const isLoading = computed(() => store.getters.getIsLoading);
/**
 * @type {ComputedRef<Boolean>}
 */
const showItems = computed(() => !!items.value && items.value.length > 0);
/**
 * @type {ComputedRef<Number>}
 */
const itemsCount = computed(() => selectedItems.value.length);
/**
 * @type {ComputedRef<Boolean>}
 */
const disableEditTop = computed(() => selectedItems.value.length > 1);

/**
 * @type {(function(id: Number): Promise<CommonResponse>)}
 */
const fetchDelete = useFetch({
  ajaxFunc: deleteAccount.execute,
  messageType: MessageTypes.messageBox
});
/**
 * @type {(function(object: AccountDelete): Promise<CommonResponse>)}
 */
const fetchDeleteItems = useFetch({
  ajaxFunc: deleteAccounts.execute,
  messageType: MessageTypes.messageBox
});

/**
 * @param {Number} id
 */
const isSelectedItem = (id) => {
  return selectedItems.value.includes(id);
}

/**
 * @param {SelectItem} obj
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
 * @param {SelectRole} obj
 */
const onSelectRole = async (obj) => {
  selectedRoleName.value = obj.roleName;
  await store.dispatch("onFilter", new Filter({
    roleCode: obj.roleCode
  }));
}

/**
 * @param {Number} id
 * @returns {Promise<void>}
 */
const deleteItem = async (id) => {
  try {
    await MessageHelper.showConfirmMessageBox({
      title: locSection.value.deleteItem.questionTitle,
      message: locSection.value.deleteItem.questionDescription,
      cancelMessage: loc.value.deleteItem.cancelBtnTitle,
      callback: async () => {
        const response = await fetchDelete(id);
        MessageHelper.showNotification({
          type: ResponseStatus.success,
          message: response?.message,
        });
        await afterDeleteItem();
      },
    });
  } catch (e) {
  }
}

/**
 * @returns {Promise<void>}
 */
const deleteSelectedItems = async () => {
  try {
    await MessageHelper.showConfirmMessageBox({
      title: locControls.value.deleteItems.questionTitle,
      message: locControls.value.deleteItems.questionDescription,
      callback: async () => {
        const response = await fetchDeleteItems(new AccountDelete({
          ids: selectedItems.value
        }));
        MessageHelper.showNotification({
          type: ResponseStatus.success,
          message: response?.message,
        });
        afterDeleteItem();
      },
      cancelMessage: loc.value.deleteItems.cancelBtnTitle
    });
  } catch (e) {
  }
}

const afterDeleteItem = async () => {
  await store.dispatch('initAccountList');
}

/**
 * @param {Sort} obj
 */
const setSortValues = (obj) => {
  (obj.sort === filter.value.sort)
    ? (obj.order = obj.order === SortTypes.asc ? SortTypes.desc : SortTypes.asc)
    : (obj.order = SortTypes.asc);
  store.dispatch('onFilter', obj);
}

const editSelectedItem = () => {
  editItem(selectedItems.value.shift());
}

/**
 * @param {Number} id
 */
const editItem = (id) => {
  if (!id) {
    return;
  }
  store.commit('setModalProps', new ModalParams({
    toggle: true,
    title: loc.value.account.titleEdit,
    code: ModalComponentsCodes.account,
    accountEditId: id
  }));
}

const refresh = async () => {
  await store.dispatch('addAccountList');
}

const onInit = async () => {
  await store.dispatch('initFilterValues');
  await store.dispatch('initPagination');
  await store.dispatch('initAccountList');
}

onInit();

</script>
