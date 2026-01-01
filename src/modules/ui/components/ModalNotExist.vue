<template>
  <div>
    <p>{{ t('ui.modal.notExistTitle') }}</p>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
