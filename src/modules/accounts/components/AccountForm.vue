<template>
  <el-form
    v-loading="isLoadingData"
    class="b-form"
    label-width="auto"
    label-position="top"
    ref="formRef"
    :rules="rules"
    :model="formData"
    @submit.prevent="onSubmit(formRef, afterSubmit, false)"
  >
    <el-row class="b-form__row">
      <el-col
        v-for="group in fields.groups"
        :key="group.code"
        class="b-form__col"
      >
        <el-form-item
          v-for="field in group.items"
          :key="field.code"
          :label="field.title"
          :prop="field.code"
        >
          <template v-if="field.type === 'file'">
            <el-upload
              class="b-upload"
              :show-file-list="true"
              :action="UploadFileUrl"
              :on-success="(response, uploadFile) => onFileUploadSuccess(field.code, response, uploadFile)"
              :before-upload="onFileUpload"
              :on-remove="() => removeFormDataValue(field.code)"
            >
              <img
                v-if="formData[field.code]?.url"
                :src="formData[field.code].url"
                class="b-upload__img"
                :alt="t('accounts.form.uploadImgAlt')"
              />
              <el-icon
                v-else
                class="b-upload__icon"
              >
                <Plus />
              </el-icon>
            </el-upload>
          </template>
          <el-select
            v-else-if="field.type === 'select'"
            v-model="formData[field.code]"
            class="b-select"
            popper-class="b-select__popper"
            :placeholder="field.placeholder"
            :class="!!formData[field.code] ? `b-select_selected b-select_selected-${getRoleCodeById(formData[field.code], field)}` : ''"
          >
            <el-option
              v-for="option in field.items"
              class="b-select__tag"
              :key="option.id"
              :label="option.name"
              :value="option.id"
              :class="'b-select__tag-' + option.code"
            />
          </el-select>
          <el-input
            v-else
            class="b-input"
            v-model="formData[field.code]"
            :placeholder="field.placeholder"
          />
        </el-form-item>
      </el-col>
      <el-col class="b-form__col b-form__col_bottom">
        <el-button
          class="b-btn b-btn_primary b-btn_large b-btn_full"
          native-type="submit"
          :loading="isLoading"
        >
          {{ submitMessage }}
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup>
import { ref, computed } from 'vue';
import { ElForm, ElFormItem, ElCol, ElRow, ElInput, ElSelect, ElOption, ElUpload, ElIcon, ElButton, ElLoading } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import { DependencyInjection, useFetch } from '@/core';
import { FormField, useForm, EmailRegex } from '@/modules/forms';
import { AccountRoleFieldCode, UploadFileUrl } from '@/modules/accounts/constants';
import { Role, AccountUpdate, AccountCreate } from '@/modules/accounts/models';
import { GetRoles, CreateAccount, GetAccountById, UpdateAccount } from '@/modules/accounts/use-case';
import { AccountFormFields } from '@/modules/accounts/fields';
import { ModalAnimationDelay } from '@/modules/ui/index.js';

/**
 * @type {GetRoles}
 */
const getRoles = DependencyInjection.resolve('GetRoles');
/**
 * @type {GetAccountById}
 */
const getAccountById = DependencyInjection.resolve('GetAccountById');
/**
 * @type {CreateAccount}
 */
const createAccount = DependencyInjection.resolve('CreateAccount');
/**
 * @type {UpdateAccount}
 */
const updateAccount = DependencyInjection.resolve('UpdateAccount');

const { t } = useI18n();

const { accountEditId } = defineProps({
  accountEditId: {
    type: [Number, Boolean],
    default: false,
  },
});

const emit = defineEmits(['update']);

/**
 * @type {(function(): Promise<Role[]>)}
 */
const fetchRoles = useFetch({
  useCase: getRoles,
});
/**
 * @type {(function(id: Number): Promise<AccountUpdate>)}
 */
const fetchAccountById = useFetch({
  useCase: getAccountById,
});

const { fields, formData, isLoading, rules, setFieldItems, setFormDataValues, removeFormDataValue, onFileUpload, onFileUploadSuccess, onSubmit } =
  useForm({
    formFields: AccountFormFields,
    useCase: !accountEditId ? createAccount : updateAccount,
    sendModel: !accountEditId ? AccountCreate : AccountUpdate,
    validators: { email: EmailRegex },
  });

/**
 * @type {ShallowRef}
 */
const formRef = ref();
/**
 * @type {import('vue').Ref<Boolean>}
 */
const isLoadingData = ref(false);

/**
 * @type {import('vue').ComputedRef<String>}
 */
const submitMessage = computed(() => {
  return accountEditId ? t('accounts.form.editBtnTitle') : t('accounts.form.createBtnTitle');
});

/**
 * @return {Promise<void>}
 */
const getAccountRoles = async () => {
  try {
    setAccountRoleOptions(await fetchRoles());
  } catch (e) {
    isLoadingData.value = false;
  }
};

/**
 * @param {Array<Role[]>} roleOptions
 */
const setAccountRoleOptions = (roleOptions) => {
  if (!roleOptions || roleOptions.length < 0) {
    return;
  }
  setFieldItems(AccountRoleFieldCode, roleOptions);
};

/**
 * @param {Number} id
 * @param {FormField} field
 */
const getRoleCodeById = (id, field) => {
  if (!id) {
    return '';
  }
  return field.items?.find((item) => item.id === id)?.code ?? '';
};

/**
 * @param {Number} id
 */
const getEditAccount = async (id) => {
  try {
    const response = await fetchAccountById(id);
    setFormDataValues(response);
  } catch (e) {
    isLoadingData.value = false;
  }
};

const afterSubmit = () => {
  emit('update');
};

/**
 * @return {Promise<void>}
 */
const onInit = async () => {
  isLoadingData.value = true;
  await getAccountRoles();
  !!accountEditId && (await getEditAccount(accountEditId));
  isLoadingData.value = false;
};

onInit();
</script>
