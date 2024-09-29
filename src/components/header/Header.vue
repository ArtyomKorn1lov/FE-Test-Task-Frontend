<template>
    <header class="b-header">
      <div class="wrap b-section">
        <div class="b-section__header b-header__section">

          <span class="b-header__title">Account users</span>

          <div class="b-header__controls">

            <el-input v-model="search" class="b-input b-input_header" placeholder="Search">
              <template #prefix>
                <el-icon class="el-input__icon">
                    <SearchIcon></SearchIcon>
                </el-icon>
              </template>
            </el-input>

            <el-button class="b-btn b-btn_primary">
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

import SearchIcon from '@/components/icons/Search.vue';

const search = ref('');

</script>