<template>
  <div class="wrap b-section b-section_page">
    <div class="b-section__content">
      <div class="b-controls">
        <span class="b-controls__title">
          2 users selected
        </span>
        <div class="b-controls__btns">
          <el-button
            class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
            v-html="'<span>' + iconEdit + 'Edit' + '</span>'"
          >
          </el-button>
          <el-button
            class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
            v-html="'<span>' + iconDelete + 'Delete' + '</span>'"
          >
          </el-button>
        </div>
      </div>
      <div class="b-account">
        <div class="b-account__top b-account__row">
          <div class="b-account__col">
            <div class="b-account__inside b-account__inside_table">
              <el-checkbox class="b-checkbox">
                User
              </el-checkbox>
            </div>
          </div>
          <div class="b-account__col">
            <div class="b-account__inside b-account__inside_table b-account__inside_right">
              <span class="b-account__table-title">
                Permission
              </span>
              <span
                class="b-account__arrow-icon"
                v-html="iconArrow"
              >
              </span>
            </div>
          </div>
        </div>
        <AccountList
          v-if="showItems"
          :items="items"
          :is-loading="isLoading"
          @refresh="refresh"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElButton, ElCheckbox } from 'element-plus';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { getIcon } from '@/lib/template';
import Request from '@/lib/request';
import { getAccounts } from '@/api/accounts';
import AccountModel from '@/models/AccountModel';
import AccountList from '@/components/account/AccountList.vue';
import FilterModel from '@/models/FilterModel';

/**
 * @type {Array<AccountModel>}
 */
const items = ref([]);
/**
 * @type {Boolean}
 */
const isLoading = ref(true);

const store = useStore()

/**
 * @type {FilterModel}
 */
const filter = computed(() => store.getters.getFilter);
/** @type {String} */
const iconArrow = computed(() => getIcon('arrow'));
/** @type {String} */
const iconDelete = computed(() => getIcon('delete'));
/** @type {String} */
const iconEdit = computed(() => getIcon('edit'));
/**
 * @type {Boolean}
 */
const showItems = computed(() => {
  return !!items.value && items.value.length > 0;
});

const refresh = async () => {
  const request = new Request();
  const queryString = request.getQueryString(filter.value);
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
      store.dispatch('nextPage', 0)
      .then((result) => {
          isLoading.value = result;
        });
    });
}

const onInit = async () => {
  await store.dispatch('initFilterValues');
  await refresh();
}

onInit();

</script>
