<template>
  <div>
    <p>{{ loc.notExistTitle }}</p>
  </div>
</template>
<script setup>
import useTranslation from '@/core/composable/translations.js';

const loc = useTranslation('modal');

</script>
