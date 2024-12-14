<template>
  <el-form
    class="b-form"
    @submit.prevent.native="submitForm"
  >
    <el-row class="b-form__row">
      <el-col class="b-form__col">
        <el-form-item
          label="Account name"
        >
          <el-input
            class="b-input"
            v-model="name"
            placeholder="Enter account name"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="Account email"
        >
          <el-input
            class="b-input"
            v-model="email"
            placeholder="Enter account email"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="Permission"
        >
          <el-select
            v-model="roleField"
            placeholder="Select permission"
            class="b-select"
            popper-class="b-select__popper"
            :class="selectActiveClass"
          >
            <el-option
              class="b-select__tag"
              v-for="item in demoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :class="'b-select__tag b-select__tag-' + item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="User image"
        >
          <el-upload
            class="b-upload"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="b-upload__img"
              alt="Preview Image"
            />
            <el-icon v-else class="b-upload__icon">
              <Plus />
            </el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img
              w-full
              :src="imageUrl"
              alt="Preview Image"
            />
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col class="b-form__col b-form__col_bottom">
        <el-button
          class="b-btn b-btn_primary b-btn_large b-btn_full"
          native-type="submit"
        >
          Create
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
  ElDialog,
  ElButton,
  ElMessage,
  ElMessageBox
} from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { ref, computed } from 'vue';

const name = ref('');
const email = ref('');
const roleField = ref('');
const imageUrl = ref('');
const dialogVisible = ref(false);

const selectActiveClass = computed(() => {
  return !!roleField.value ? `b-select_selected b-select_selected-${roleField.value}` : "";
});

const demoOptions = [
  {
    value: 'agent',
    label: 'Agent',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'manager',
    label: 'Account manager',
  },
  {
    value: 'reviewer',
    label: 'External reviewer',
  },
];

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  !!uploadFile.raw && (imageUrl.value = URL.createObjectURL(uploadFile.raw));
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
}

const submitForm = (formRef) => {
  /*ElMessageBox.alert(
    'Form is send success',
    'Success',
    {
      customClass: "b-message-box",
      center: true,
      type: "success",
      showConfirmButton: false
    });*/
  ElMessageBox.alert(
    'Error response invalid server',
    'Error',
    {
      customClass: "b-message-box",
      showClose: false,
      center: true,
      type: "error",
      confirmButtonClass: "b-btn b-btn_primary b-btn_normal b-btn_full",
      confirmButtonText: "Close"
    });
}

</script>
