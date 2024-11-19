<template>
    <div class="wrap b-section">
        <div class="b-section__content">
            <div class="b-controls">
                <span class="b-controls__title">
                    2 users selected
                </span>
                <div class="b-controls__btns">
                    <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                        <Edit />Edit
                    </el-button>
                    <el-button class="b-btn b-btn_secondary b-btn_medium b-btn_icon">
                        <Delete />Delete
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ElButton } from 'element-plus';
import Edit from '@/components/icons/Edit.vue';
import Delete from '@/components/icons/Delete.vue';
</script>