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
              <el-checkbox class="b-checkbox">User</el-checkbox>
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
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElButton, ElCheckbox } from 'element-plus';
import { getIcon } from '@/lib/template';
import { computed, ref } from 'vue';
import Request from '@/lib/request';
import { getAccounts } from '@/api/accounts';
import QueryParamModel from '@/models/QueryParamModel';
import AccountModel from '@/models/AccountModel';
import AccountList from '@/components/account/AccountList.vue';

/**
 * @type {Array<AccountModel>}
 */
const items = ref([]);

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

const getAccountsData = async () => {
  /**
   * @type {Array<QueryParamModel>}
   */
  const queryParams = [
    {
      code: 'page',
      value: '1'
    },
    {
      code: 'pageCount',
      value: '20'
    },
    {
      code: 'sort',
      value: 'sort'
    },
    {
      code: 'order',
      value: 'ASC'
    },
  ];
  const request = new Request();
  const queryString = request.getQueryString(queryParams);
  await getAccounts(queryString)
    .then((response) => {
      items.value = response?.data?.map((item) => {
        return new AccountModel(item);
      });
    })
    .catch((error) => {
      console.error('GET error:{accounts/list}', error);
    });
}

getAccountsData();

</script>
