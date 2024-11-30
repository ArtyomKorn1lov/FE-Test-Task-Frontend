<template>
  <el-form
    class="b-form"
  >
    <el-row>
      <el-col>
        <el-form-item
          label="Account name"
        >
          <el-input
            class="b-input"
            placeholder="Enter account name"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="Account email"
        >
          <el-input
            class="b-input"
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
          >
            <el-option
              v-for="item in demoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
        </el-form-item>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible">
      <img
        w-full
        :src="imageUrl"
        alt="Preview Image"
      />
    </el-dialog>
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
import { ref } from 'vue';

const roleField = ref('');
const imageUrl = ref('');
const dialogVisible = ref(false);

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
    value: 'account-manager',
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

</script>
