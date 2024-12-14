<template>
  <header class="b-header">
    <div class="wrap b-section">
      <div class="b-section__header b-header__section">

        <span class="b-header__title">
          Account users
        </span>

        <div class="b-header__controls">

          <el-input
            v-model="search"
            class="b-input b-input_header"
            placeholder="Search"
          >
            <template #prefix>
              <el-icon
                class="el-input__icon"
                v-html="iconSearch"
              >
              </el-icon>
            </template>
          </el-input>

          <el-button
            class="b-btn b-btn_primary"
            native-type="button"
            @click="openModal"
          >
            Connect users
          </el-button>

        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ElInput, ElIcon, ElButton } from 'element-plus';
import { ref } from 'vue';
import { getIcon } from '@/lib/template';
import { computed } from 'vue';

const search = ref('');

const emit = defineEmits(['open-modal']);

const iconSearch = computed(() => getIcon('search'));

const openModal = () => {
  emit('open-modal', true);
}
</script>
