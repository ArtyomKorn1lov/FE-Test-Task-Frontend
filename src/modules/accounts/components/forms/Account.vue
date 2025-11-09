<template>
  <el-form
    class="b-form"
    ref="formRef"
    :rules="rules"
    :model="formData"
    @submit.prevent.native="onSubmit(formRef, afterSubmit)"
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
              :action="uploadFileUrl"
              :on-success="(response, uploadFile) => handleFileUploadSuccess(field.code, response, uploadFile)"
              :before-upload="beforeFileUpload"
              :on-remove="() => removeFormDataValue(field.code)"
            >
              <img
                v-if="formData[field.code]?.url"
                :src="formData[field.code].url"
                class="b-upload__img"
                :alt="loc.uploadImgAlt"
              />
              <el-icon v-else class="b-upload__icon">
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
            :class="!!formData[field.code] ? `b-select_selected b-select_selected-${getRoleCodeById(formData[field.code])}` : ''"
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
          >
          </el-input>
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
import {
  ElForm,
  ElFormItem,
  ElCol,
  ElRow,
  ElInput,
  ElSelect,
  ElOption,
  ElUpload,
  ElIcon,
  ElButton,
  ElMessage,
} from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { ref, reactive, computed, ComputedRef } from 'vue';
import useTranslation from '@/core/composable/translations.js';
import useForm from '@/modules/forms/composable/useForm.js';
import { getRoles, createAccount, getAccountById, editAccount } from '@/core/api/accounts.js';
import AccountFormFields from '@/core/models/AccountFormFields.js';
import { uploadFileUrl } from '@/core/api/options.js';
import { EmailValidatorRegex, AccountRoleFieldCode, MaxFileSize, FileDividerTypeCasting, SuccessStatusCode, ErrorStatusCode } from '@/core/lib/constants.js';
import Request from '@/core/lib/request.js';
import AccountFormValidatorsModel from '@/core/models/AccountFormValidatorsModel.js';
import AccountCreateModel from '@/core/models/AccountCreateModel.js';
import AccountCreateFileModel from '@/core/models/AccountCreateFileModel.js';
import AccountEditModel from '@/core/models/AccountEditModel.js';
import { UseFormParams } from "@/modules/forms";

const loc = useTranslation('accountForm');

const { accountEditId } = defineProps({
  accountEditId: {
    type: [Number, Boolean],
    default: false
  }
});

const emit = defineEmits(['update']);

/**
 * @type {ShallowRef}
 */
const formRef = ref();
/**
 * @type {Object}
 */
const fields = reactive(AccountFormFields);

const {
  formData,
  isLoading,
  rules,
  onSubmit
} = useForm(
  new UseFormParams({
    fields: fields,
    ajaxFunc: !accountEditId ? createAccount : editAccount,
    sendModel: accountEditId ? AccountCreateModel : AccountEditModel,
    validators: new AccountFormValidatorsModel({ email: EmailValidatorRegex })
  })
);

/**
 * @type {ComputedRef<String>}
 */
const submitMessage = computed(() => {
  return !!accountEditId ? loc.value.editBtnTitle : loc.value.createBtnTitle;
});

const getAccountRoles = async () => {
  await getRoles()
    .then((response) => {
      const roleOptions = response?.data;
      setAccountRoleOptions(roleOptions);
    })
    .catch((error) => {
      console.error('GET error:{accounts/roles}', error);
    });
}

/**
 * @param {Array<Object>} roleOptions
 */
const setAccountRoleOptions = (roleOptions) => {
  if (!roleOptions || roleOptions.length < 0) {
    return;
  }
  (!!fields.groups && fields.groups.length > 0)
    && fields.groups.forEach((group, groupIndex) => {
      (!!group.items && group.items.length > 0)
        && group.items.forEach((field, fieldIndex) => {
          const items = fields.groups[groupIndex].items[fieldIndex].items;
          (!!items && fields.groups[groupIndex].items[fieldIndex].code === AccountRoleFieldCode)
            && (fields.groups[groupIndex].items[fieldIndex].items = roleOptions);
        });
    });
}

/**
 * @param {Number} id
 */
const getRoleCodeById = (id) => {
  if (!id) {
    return '';
  }
  let result = '';
  (!!fields.groups && fields.groups.length > 0)
    && fields.groups.forEach((group, groupIndex) => {
      (!!group.items && group.items.length > 0)
        && group.items.forEach((field, fieldIndex) => {
          const items = fields.groups[groupIndex].items[fieldIndex].items;
          if (!!items && items.length > 0) {
            result = items.filter((item) => item.id === id)[0]?.code;
          }
        });
    });
  return result;
}

/**
 * @param {Number} id
 */
const getEditAccount = async (id) => {
  let accountModel = {};
  await getAccountById(id)
    .then((response) => {
      accountModel = new AccountEditModel(response?.data);
    })
    .catch((error) => {
      console.error('GET error:{accounts/:id}', error);
      ElMessage({
        message: error,
        type: ErrorStatusCode,
      });
    });
  for (const key in accountModel) {
    formData[key] = accountModel[key];
  }
}

/**
 * @param {String} code
 * @param {String} response
 * @param {File} uploadFile
 */
const handleFileUploadSuccess = async (code, response, uploadFile) => {
  ElMessage({
    message: response,
    type: SuccessStatusCode,
  });
  const request = new Request();
  formData[code] = new AccountCreateFileModel({
    file: await request.convertToBase64(uploadFile.raw),
    name: uploadFile.name,
    url: URL.createObjectURL(uploadFile.raw)
  });
}

/**
 * @param {File} rawFile
 */
const beforeFileUpload = (rawFile) => {
  if (rawFile.size / FileDividerTypeCasting / FileDividerTypeCasting > MaxFileSize) {
    ElMessage.error(`${loc.value.pictureUploadSizeError} ${MaxFileSize}MB!`);
    return false;
  }
  return true;
}

/**
 * @param {String} code
 */
const removeFormDataValue = (code) => {
  formData[code] = null;
}

const afterSubmit = () => {
  emit('update');
}

const onInit = async () => {
  await getAccountRoles();
  !!accountEditId && await getEditAccount(accountEditId);
}

onInit();

</script>
